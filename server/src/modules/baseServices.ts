/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';
import CustomError from '../errors/customError';
import httpStatus from 'http-status';

class BaseServices<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    if (!model || !(model.prototype instanceof Model)) {
      throw new Error('Invalid Mongoose model!');
    }

    this.model = model;
  }

  async update(id: string, payload: any) {
    await this._isExists(id);
    return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  }

  async delete(id: string) {
    await this._isExists(id);
    return this.model.findByIdAndDelete(id);
  }

  protected async _isExists(id: string) {
    if (!(await this.model.findById(id))) {
      throw new CustomError(httpStatus.NOT_FOUND, 'Data is not found!');
    }
  }
}

export default BaseServices;
