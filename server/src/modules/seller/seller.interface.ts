import { Types } from 'mongoose';

export interface ISeller {
  user: Types.ObjectId;
  name: string;
  email?: string;
  contactNo: string;
}
