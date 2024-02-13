import { Types } from "mongoose";

export interface IPurchase {
  seller: Types.ObjectId;
  product: Types.ObjectId;
  sellerName: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  paid: number;
}