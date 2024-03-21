/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';
import CustomError from '../errors/customError';
import httpStatus from 'http-status';

class BaseServices<T> {
  protected model: Model<T>;
  protected modelName: string = '';

  constructor(model: Model<T>, modelName: string) {
    if (!model || !(model.prototype instanceof Model)) {
      throw new Error('Invalid Mongoose model!');
    }

    this.model = model;
    this.modelName = modelName;
  }

  /**
   * Create new
   */
  async create(payload: any, userId: string) {
    payload.user = userId;
    return this.model.create(payload);
  }

  /**
   * Update
   */
  async update(id: string, payload: any) {
    await this._isExists(id);
    return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  }

  /**
   * Delete
   */
  async delete(id: string) {
    await this._isExists(id);
    return this.model.findByIdAndDelete(id);
  }

  protected async _isExists(id: string) {
    if (!(await this.model.findById(id))) {
      throw new CustomError(httpStatus.NOT_FOUND, this.modelName + ' is not found!');
    }
  }
}

export default BaseServices;
