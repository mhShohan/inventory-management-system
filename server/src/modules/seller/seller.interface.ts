import { Types } from 'mongoose';

export interface ISeller {
  user: Types.ObjectId;
  name: string;
  amount: number;
  paid: number;
  date: Date;
}
