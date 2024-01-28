/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import sortAndPaginatePipeline from '../../lib/sortAndPaginate.pipeline';
import BaseServices from '../baseServices';
import matchStagePipeline from './product.aggregation.pipeline';
import Product from './product.model';

class ProductServices extends BaseServices<any> {
  constructor(model: any) {
    super(model);
  }

  /**
   * Add new Product
   */
  async create(payload: any, userId: string) {
    payload.user = userId;
    return this.model.create(payload);
  }

  /**
   * Count Total Product
   */
  async countTotalProduct(userId: string) {
    return this.model.aggregate([
      {
        $match: {
          user: new Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: '$quantity' }
        }
      },
      {
        $project: {
          totalQuantity: 1,
          _id: 0
        }
      }
    ]);
  }

  /**
   * Get All product of user
   */
  async readAll(query: Record<string, unknown> = {}, userId: string) {
    let data = await this.model.aggregate([...matchStagePipeline(query, userId), ...sortAndPaginatePipeline(query)]);

    data = await this.model.populate(data, {
      path: 'user',
      select: '-createdAt -updatedAt -__v'
    });

    const totalCount = await this.model.aggregate([
      ...matchStagePipeline(query, userId),
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

  /**
   * Get Single product of user
   */
  async read(id: string, userId: string) {
    await this._isExists(id);

    return this.model.findOne({ user: new Types.ObjectId(userId), _id: id }).populate({
      path: 'user',
      select: '-createdAt -updatedAt -__v'
    });
  }

  async bulkDelete(payload: string[]) {
    const data = payload.map((item) => new Types.ObjectId(item));

    return this.model.deleteMany({ _id: { $in: data } });
  }
}

const productServices = new ProductServices(Product);
export default productServices;
