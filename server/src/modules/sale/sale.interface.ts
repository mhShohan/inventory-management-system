import { Types } from 'mongoose';

export interface ISale {
  user: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  buyerName: string;
  date: Date;
  totalPrice: number;
  productName: string;
  productPrice: number;
}
