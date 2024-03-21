import httpStatus from 'http-status';
import asyncHandler from '../../lib/asyncHandler';
import sendResponse from '../../lib/sendResponse';
import sellerServices from './seller.services';

class SellerControllers {
  services = sellerServices;

  /**
   * create new sale
   */
  create = asyncHandler(async (req, res) => {
    const result = await this.services.create(req.body, req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'New seller created successfully!',
      data: result
    });
  });

  /**
   * Get all sale of user with query
   */
  readAll = asyncHandler(async (req, res) => {
    const result = await this.services.readAll(req.query, req.user._id);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All seller retrieved successfully',
      meta: {
        page,
        limit,
        total: result?.totalCount[0]?.total || 0,
        totalPage: Math.ceil(result?.totalCount[0]?.total / limit)
      },
      data: result.data
    });
  });

  /**
   * Get single sale of user
   */
  readSingle = asyncHandler(async (req, res) => {
    const result = await this.services.read(req.params.id, req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Seller fetched successfully!',
      data: result
    });
  });

  /**
   * update sale
   */
  update = asyncHandler(async (req, res) => {
    const result = await this.services.update(req.params.id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Seller updated successfully!',
      data: result
    });
  });

  /**
   * delete sale
   */
  delete = asyncHandler(async (req, res) => {
    await this.services.delete(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Seller delete successfully!'
    });
  });
}

const sellerControllers = new SellerControllers();
export default sellerControllers;
