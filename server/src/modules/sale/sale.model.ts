import { Schema, model } from 'mongoose';
import { ISale } from './sale.interface';

const saleSchema = new Schema<ISale>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    product: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
    buyerName: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

const Sale = model<ISale>('sale', saleSchema);
export default Sale;
