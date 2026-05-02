import { Types } from 'mongoose';

export type TransactionType = 'SALE' | 'PURCHASE' | 'ADJUSTMENT';

export interface IInventoryTransaction {
  user: Types.ObjectId;
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
}
