import { Types } from 'mongoose';

export interface ICategory {
  user: Types.ObjectId;
  name: string;
}
