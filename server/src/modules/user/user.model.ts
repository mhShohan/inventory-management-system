import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import hashPassword from '../../utils/hashPassword';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }

  next();
});

const User = model<IUser>('user', userSchema);
export default User;
