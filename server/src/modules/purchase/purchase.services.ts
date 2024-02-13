/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";
import BaseServices from "../baseServices";
import { IPurchase } from "./purchase.interface";
import Purchase from "./purchase.model";

class PurchaseServices extends BaseServices<any>{
  constructor(model: any, modelName: string) {
    super(model, modelName)
  }

  /**
  * Create new sale and decrease product stock
  */
  async create(payload: IPurchase, userId: string) {
    const { unitPrice, quantity } = payload;
    payload.user = new Types.ObjectId(userId);
    payload.totalPrice = unitPrice * quantity;

    return this.model.create(payload)
  }

  /**
   * Read all category of user
   */
  async getAll(userId: string) {
    return this.model.find({ user: userId })
  }
}

const purchaseServices = new PurchaseServices(Purchase, 'Purchase')
export default purchaseServices