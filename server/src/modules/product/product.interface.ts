import { Types } from 'mongoose';

export interface IProduct {
  user: Types.ObjectId;
  name: string;
  description?: string
  variant?: string;
  category: Types.ObjectId;
  brand?: Types.ObjectId;
  size?: string;
  price: number;
  stock: number;
}
