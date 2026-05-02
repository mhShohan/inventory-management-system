import { Schema, model } from 'mongoose';
import { ISale, ISaleItem } from './sale.interface';

const saleItemSchema = new Schema<ISaleItem>(
  {
    product: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  },
  { _id: false }
);

const saleSchema = new Schema<ISale>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    product: { type: Schema.Types.ObjectId, ref: 'product' },
    buyerName: { type: String, required: true },
    productName: { type: String },
    quantity: { type: Number },
    totalPrice: { type: Number, required: true },
    productPrice: { type: Number },
    date: { type: Date, required: true },
    items: { type: [saleItemSchema], default: [] }
  },
  { timestamps: true }
);

const Sale = model<ISale>('sale', saleSchema);
export default Sale;
