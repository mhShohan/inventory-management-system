import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    name: { type: String, required: true },
    color: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true, enum: ['SMALL', 'MEDIUM', 'LARGE'] },
    bloomDate: { type: Date, required: true },
    fragrance: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  },
  { timestamps: true }
);

const Product = model<IProduct>('product', productSchema);
export default Product;
