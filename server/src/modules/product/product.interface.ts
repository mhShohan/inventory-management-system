import { Types } from 'mongoose';

export interface IProduct {
  user: Types.ObjectId;
  name: string;
  color: string;
  type: string;
  size: string;
  bloomDate: Date;
  fragrance: string;
  price: number;
  quantity: number;
}
