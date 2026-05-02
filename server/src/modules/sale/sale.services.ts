/* eslint-disable no-unsafe-finally */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from 'mongoose';
import sortAndPaginatePipeline from '../../lib/sortAndPaginate.pipeline';
import BaseServices from '../baseServices';
import Sale from './sale.model';
import Product from '../product/product.model';
import CustomError from '../../errors/customError';
import StockInsufficientError from '../../errors/stockInsufficientError';
import { ISaleItem, IStockInsufficientItem } from './sale.interface';
import inventoryTransactionServices from '../inventoryTransaction/inventoryTransaction.services';

class SaleServices extends BaseServices<any> {
  constructor(model: any, modelName: string) {
    super(model, modelName);
  }

  /**
   * Create new sale with anti-oversell logic
   * Supports both single product and multiple products (via items array)
   */
  async create(payload: any, userId: string) {
    const { items, product, productName, productPrice, quantity, buyerName, date } = payload;
    
    let saleItems: ISaleItem[] = [];
    let totalPrice = 0;

    if (items && items.length > 0) {
      saleItems = items.map((item: any) => ({
        ...item,
        totalPrice: item.productPrice * item.quantity
      }));
      totalPrice = saleItems.reduce((sum: number, item: ISaleItem) => sum + item.totalPrice, 0);
    } else {
      saleItems = [{
        product: new Types.ObjectId(product),
        productName: productName,
        productPrice: productPrice,
        quantity: quantity,
        totalPrice: productPrice * quantity
      }];
      totalPrice = productPrice * quantity;
    }

    const productIds = saleItems.map((item: ISaleItem) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(products.map(p => [p._id.toString(), p]));

    const insufficientItems: IStockInsufficientItem[] = [];

    for (const item of saleItems) {
      const product = productMap.get(item.product.toString());
      
      if (!product) {
        insufficientItems.push({
          product: item.product.toString(),
          productName: item.productName,
          requestedQuantity: item.quantity,
          currentStock: 0,
          reason: '商品不存在'
        });
        continue;
      }

      if (item.quantity <= 0) {
        insufficientItems.push({
          product: item.product.toString(),
          productName: item.productName,
          requestedQuantity: item.quantity,
          currentStock: product.stock,
          reason: '销售数量必须大于0'
        });
        continue;
      }

      if (item.quantity > product.stock) {
        insufficientItems.push({
          product: item.product.toString(),
          productName: item.productName,
          requestedQuantity: item.quantity,
          currentStock: product.stock,
          reason: `库存不足，当前库存: ${product.stock}`
        });
      }
    }

    if (insufficientItems.length > 0) {
      throw new StockInsufficientError(
        400,
        `${insufficientItems.length} 个商品库存不足`,
        insufficientItems
      );
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const saleData = {
        user: new Types.ObjectId(userId),
        buyerName,
        date: new Date(date),
        totalPrice,
        items: saleItems,
        product: items && items.length > 0 ? undefined : saleItems[0].product,
        productName: items && items.length > 0 ? undefined : saleItems[0].productName,
        productPrice: items && items.length > 0 ? undefined : saleItems[0].productPrice,
        quantity: items && items.length > 0 ? undefined : saleItems[0].quantity
      };

      const [saleResult] = await this.model.create([saleData], { session });

      for (const item of saleItems) {
        const product = productMap.get(item.product.toString());
        const previousStock = product!.stock;
        const newStock = previousStock - item.quantity;

        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: -item.quantity } },
          { session }
        );

        await inventoryTransactionServices.createTransaction({
          user: userId,
          product: item.product,
          productName: item.productName,
          transactionType: 'SALE',
          quantity: item.quantity,
          previousStock,
          newStock,
          referenceId: saleResult._id,
          referenceType: 'SALE',
          note: `销售出库，客户: ${buyerName}`,
          date: new Date(date)
        }, session);
      }

      await session.commitTransaction();

      return saleResult;
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof StockInsufficientError) {
        throw error;
      }
      throw new CustomError(400, 'Sale create failed');
    } finally {
      await session.endSession();
    }
  }

  /**
   *  Get all sale
   */
  async readAll(query: Record<string, unknown> = {}, userId: string) {
    // const date = query.date ? query.date : null;
    const search = query.search ? (query.search as string) : '';

    const data = await this.model.aggregate([
      {
        $match: {
          user: new Types.ObjectId(userId),
          $or: [
            { productName: { $regex: search, $options: 'i' } },
            { buyerName: { $regex: search, $options: 'i' } },
            { items: { $elemMatch: { productName: { $regex: search, $options: 'i' } } } }
          ]
        }
      },
      ...sortAndPaginatePipeline(query)
    ]);

    const totalCount = await this.model.aggregate([
      {
        $match: {
          user: new Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0
        }
      }
    ]);

    return { data, totalCount };
  }

  async readAllWeeks(userId: string) {
    return await this.model.aggregate([
      {
        $match: {
          user: new Types.ObjectId(userId),
          date: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: {
            week: { $isoWeek: '$date' },
            year: { $isoWeekYear: '$date' }
          },
          totalQuantity: { $sum: '$quantity' },
          totalRevenue: { $sum: '$totalPrice' }
        }
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.week': 1
        }
      },
      {
        $project: {
          week: '$_id.week',
          year: '$_id.year',
          totalQuantity: 1,
          totalRevenue: 1,
          _id: 0
        }
      }
    ]);
  }

  async readAllYearly(userId: string) {
    return await this.model.aggregate([
      {
        $match: {
          user: new Types.ObjectId(userId),
          date: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' }
          },
          totalQuantity: { $sum: '$quantity' },
          totalRevenue: { $sum: '$totalPrice' }
        }
      },
      {
        $sort: {
          '_id.year': 1
        }
      },
      {
        $project: {
          year: '$_id.year',
          totalQuantity: 1,
          totalRevenue: 1,
          _id: 0
        }
      }
    ]);
  }

  async readAllDaily(userId: string) {
    return await this.model.aggregate([
      {
        $match: {
          user: new Types.ObjectId(userId),
          date: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: '$date' },
            month: { $month: '$date' },
            year: { $year: '$date' }
          },
          totalQuantity: { $sum: '$quantity' },
          totalRevenue: { $sum: '$totalPrice' }
        }
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1
        }
      },
      {
        $project: {
          day: '$_id.day',
          month: '$_id.month',
          year: '$_id.year',
          totalQuantity: 1,
          totalRevenue: 1,
          _id: 0
        }
      }
    ]);
  }

  async readAllMonths(userId: string) {
    return await this.model.aggregate([
      {
        $match: {
          user: new Types.ObjectId(userId),
          date: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            year: { $year: '$date' }
          },
          totalQuantity: { $sum: '$quantity' },
          totalRevenue: { $sum: '$totalPrice' }
        }
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1
        }
      },
      {
        $project: {
          month: '$_id.month',
          year: '$_id.year',
          totalQuantity: 1,
          totalRevenue: 1,
          _id: 0
        }
      }
    ]);
  }

  // get single sale
  async read(id: string, userId: string) {
    await this._isExists(id);

    return this.model.findOne({ user: new Types.ObjectId(userId), _id: id }).populate({
      path: 'product',
      select: '-createdAt -updatedAt -__v'
    });
  }
}

const saleServices = new SaleServices(Sale, 'modelName');
export default saleServices;
