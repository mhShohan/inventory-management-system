import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    seller: { type: Schema.Types.ObjectId, required: true, ref: 'Seller' },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'category' },
    name: { type: String, required: true },
    size: { type: String, enum: ['SMALL', 'MEDIUM', 'LARGE'] },
    brand: { type: Schema.Types.ObjectId, ref: 'brand' },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String }
  },
  { timestamps: true }
);

const Product = model<IProduct>('product', productSchema);
export default Product;
