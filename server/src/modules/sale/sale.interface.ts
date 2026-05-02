import { Types } from 'mongoose';

export interface ISaleItem {
  product: Types.ObjectId;
  productName: string;
  productPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface IStockInsufficientItem {
  product: string;
  productName: string;
  requestedQuantity: number;
  currentStock: number;
  reason: string;
}

export interface ISale {
  user: Types.ObjectId;
  product?: Types.ObjectId;
  productName?: string;
  productPrice?: number;
  quantity?: number;
  buyerName: string;
  date: Date;
  totalPrice: number;
  items?: ISaleItem[];
}
