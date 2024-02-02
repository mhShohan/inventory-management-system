import { Types } from 'mongoose';

export interface ISale {
  user: Types.ObjectId;
  product: Types.ObjectId;
  productName: string;
  productPrice: number;
  quantity: number;
  buyerName: string;
  date: Date;
  totalPrice: number;
}
