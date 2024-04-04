import httpStatus from 'http-status';
import asyncHandler from '../../lib/asyncHandler';
import sendResponse from '../../lib/sendResponse';
import saleServices from './sale.services';

class SaleControllers {
  services = saleServices;

  /**
   * create new sale
   */
  create = asyncHandler(async (req, res) => {
    const result = await this.services.create(req.body, req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'sale created successfully!',
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
      message: 'All sales retrieved successfully',
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
   * Get all sale by months
   */
  readAllMonths = asyncHandler(async (req, res) => {
    const result = await this.services.readAllMonths(req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'monthly sales retrieved successfully',
      data: result
    });
  });

  /**
   * Get all sale by daily
   */
  readAllDaily = asyncHandler(async (req, res) => {
    const result = await this.services.readAllDaily(req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'daily sales retrieved successfully',
      data: result
    });
  });

  /**
   * Get all sale by yearly
   */
  readAllYearly = asyncHandler(async (req, res) => {
    const result = await this.services.readAllYearly(req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'yearly sales retrieved successfully',
      data: result
    });
  });

  /**
   * Get all sale by week
   */
  readAllWeeks = asyncHandler(async (req, res) => {
    const result = await this.services.readAllWeeks(req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'weekly sales retrieved successfully',
      data: result
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
      message: 'sale fetched successfully!',
      data: result
    });
  });

  /**
   * update sale
   */
  update = asyncHandler(async (req, res) => {
    const { price, quantity, ...restPayload } = req.body;

    const sale = await this.services.read(req.params.id, req.user._id);

    const updatedPrice = price || sale.product.price;
    const updatedQuantity = quantity || sale.quantity;

    restPayload.totalPrice = updatedPrice * updatedQuantity;
    restPayload.quantity = updatedQuantity;

    const result = await this.services.update(req.params.id, restPayload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'sale updated successfully!',
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
      message: 'sale delete successfully!'
    });
  });
}

const saleControllers = new SaleControllers();
export default saleControllers;
