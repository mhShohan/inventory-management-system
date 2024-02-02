import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    name: { type: String, required: true },
    description: { type: String },
    variant: { type: String },
    size: { type: String, enum: ['SMALL', 'MEDIUM', 'LARGE'] },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'category' },
    brand: { type: Schema.Types.ObjectId, ref: 'brand' },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
  },
  { timestamps: true }
);

const Product = model<IProduct>('product', productSchema);
export default Product;
