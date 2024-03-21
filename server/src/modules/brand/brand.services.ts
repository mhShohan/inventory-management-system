/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseServices from '../baseServices';
import Brand from './brand.model';

class BrandServices extends BaseServices<any> {
  constructor(model: any, modelName: string) {
    super(model, modelName);
  }

  /**
   * Read all category of user
   */
  async getAll(userId: string) {
    return this.model.find({ user: userId });
  }
}

const brandServices = new BrandServices(Brand, 'Brand');
export default brandServices;
