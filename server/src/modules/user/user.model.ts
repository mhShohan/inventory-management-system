import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import hashPassword from '../../utils/hashPassword';
import { UserRole } from '../../constant/userRole';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    title: { type: String },
    description: { type: String },
    avatar: { type: String },
    role: { type: String, enum: UserRole, default: 'USER' },
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
