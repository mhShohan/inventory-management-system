/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';

const matchStagePipeline = (query: Record<string, unknown>, userId: string) => {
  let minPrice = 0;
  let maxPrice = Number.MAX_VALUE;

  if (query.minPrice) {
    minPrice = Number(query.minPrice);
  }

  if (query.maxPrice) {
    maxPrice = Number(query.maxPrice);
  }

  const fieldQuery: any = [{ user: new Types.ObjectId(userId) }, { price: { $gte: minPrice, $lte: maxPrice } }];

  if (query.name) {
    fieldQuery.push({ name: { $regex: new RegExp(query.name as string, 'i') } });
  }

  if (query.category) {
    const isValidId = Types.ObjectId.isValid(query.category as string);

    if (isValidId) {
      fieldQuery.push({ category: { $eq: new Types.ObjectId(query.category as string) } });
    }
  }

  if (query.brand) {
    const isValidId = Types.ObjectId.isValid(query.brand as string);

    if (isValidId) {
      fieldQuery.push({ brand: { $eq: new Types.ObjectId(query.brand as string) } });
    }
  }

  return [
    {
      $match: {
        $and: [...fieldQuery]
      }
    }
  ];
};

export default matchStagePipeline;
