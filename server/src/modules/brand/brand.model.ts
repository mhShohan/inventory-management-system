import { Schema, model } from 'mongoose';
import { IBrand } from './brand.interface';

const brandSchema = new Schema<IBrand>({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  name: { type: String, required: true }
});

const Brand = model<IBrand>('brand', brandSchema);
export default Brand;
