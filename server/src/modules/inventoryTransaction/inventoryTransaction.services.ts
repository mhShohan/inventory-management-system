import mongoose, { Types } from 'mongoose';
import BaseServices from '../baseServices';
import InventoryTransaction from './inventoryTransaction.model';
import { TransactionType } from './inventoryTransaction.interface';

class InventoryTransactionServices extends BaseServices<any> {
  constructor(model: any, modelName: string) {
    super(model, modelName);
  }

  /**
   * 创建库存流水记录
   */
  async createTransaction(
    payload: {
      user: string;
      product: Types.ObjectId;
      productName: string;
      transactionType: TransactionType;
      quantity: number;
      previousStock: number;
      newStock: number;
      referenceId?: Types.ObjectId;
      referenceType?: 'SALE' | 'PURCHASE';
      note?: string;
      date: Date;
    },
    session?: mongoose.ClientSession
  ) {
    const transactionData = {
      ...payload,
      user: new Types.ObjectId(payload.user)
    };

    if (session) {
      return this.model.create([transactionData], { session });
    }
    return this.model.create(transactionData);
  }

  /**
   * 获取商品的库存历史
   */
  async getProductHistory(productId: string, userId: string, query: Record<string, unknown> = {}) {
    const search = query.search ? (query.search as string) : '';
    
    const matchQuery: Record<string, unknown> = {
      user: new Types.ObjectId(userId),
      product: new Types.ObjectId(productId)
    };

    if (search) {
      matchQuery.$or = [
        { productName: { $regex: search, $options: 'i' } },
        { note: { $regex: search, $options: 'i' } }
      ];
    }

    return this.model.find(matchQuery).sort({ date: -1 });
  }
}

const inventoryTransactionServices = new InventoryTransactionServices(InventoryTransaction, 'InventoryTransaction');
export default inventoryTransactionServices;
