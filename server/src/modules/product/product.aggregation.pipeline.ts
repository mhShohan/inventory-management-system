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

  const fieldQuery: any = [
    { quantity: { $gt: 0 } },
    { user: new Types.ObjectId(userId) },
    { price: { $gte: minPrice, $lte: maxPrice } }
  ];

  if (query.bloomDate) {
    fieldQuery.push({ bloomDate: { $eq: new Date(query.bloomDate as string) } });
  }

  if (query.color) {
    fieldQuery.push({ color: { $regex: new RegExp(query.color as string, 'i') } });
  }

  if (query.type) {
    fieldQuery.push({ type: { $regex: new RegExp(query.type as string, 'i') } });
  }

  if (query.size) {
    fieldQuery.push({ size: query.size as string });
  }

  if (query.fragrance) {
    fieldQuery.push({ fragrance: { $regex: new RegExp(query.fragrance as string, 'i') } });
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
