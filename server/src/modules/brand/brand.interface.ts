import { Types } from 'mongoose';

export interface IBrand {
  user: Types.ObjectId;
  name: string;
}
