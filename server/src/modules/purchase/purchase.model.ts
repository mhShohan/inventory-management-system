import { IPurchase } from "./purchase.interface";
import { model, Schema } from "mongoose";

const purchaseSchema = new Schema<IPurchase>({
  seller: { types: Schema.Types.ObjectId, required: true, ref: 'seller' },
  product: { types: Schema.Types.ObjectId, required: true, ref: 'product' },
  sellerName: { types: String, required: true },
  productName: { types: String, required: true },
  quantity: { types: Number, required: true },
  unitPrice: { types: Number, required: true },
  totalPrice: { types: Number, required: true },
  paid: { types: Number, default: 0 },
})

const Purchase = model<IPurchase>('purchase', purchaseSchema)

export default Purchase