import { Types } from "mongoose";

export interface ICategory {
  user: Types.ObjectId
  category: string
}