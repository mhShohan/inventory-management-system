import { Schema, model } from 'mongoose';
import { ISeller } from './seller.interface';

const sellerSchema = new Schema<ISeller>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    name: { type: String },
    email: { type: String, unique: true },
    contactNo: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

const Seller = model<ISeller>('Seller', sellerSchema);
export default Seller;
