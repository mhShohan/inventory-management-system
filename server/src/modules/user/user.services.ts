import httpStatus from 'http-status';
import CustomError from '../../errors/customError';
import generateToken from '../../utils/generateToken';
import { IUser } from './user.interface';
import User from './user.model';
import verifyPassword from '../../utils/verifyPassword';

class UserServices {
  private model = User;

  // get profile
  async getSelf(userId: string) {
    return this.model.findById(userId);
  }
  // register new user
  async register(payload: IUser) {
    const user = await this.model.create(payload);

    const token = generateToken({ _id: user._id, email: user.email });
    return { token };
  }

  // login existing user
  async login(payload: { email: string; password: string }) {
    const user = await this.model.findOne({ email: payload.email }).select('+password');

    if (user) {
      await verifyPassword(payload.password, user.password);

      const token = generateToken({ _id: user._id, email: user.email });
      return { token };
    } else {
      throw new CustomError(httpStatus.BAD_REQUEST, 'WrongCredentials');
    }
  }

  // update user profile
  async updateProfile(id: string, payload: Partial<IUser>) {
    return this.model.findByIdAndUpdate(id, payload);
  }
}

const userServices = new UserServices();
export default userServices;
