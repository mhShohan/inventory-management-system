import httpStatus from 'http-status';
import asyncHandler from '../../lib/asyncHandler';
import sendResponse from '../../lib/sendResponse';
import productServices from './product.services';

class ProductControllers {
  services = productServices;

  /**
   * create new product
   */
  create = asyncHandler(async (req, res) => {
    const result = await this.services.create(req.body, req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Product created successfully!',
      data: result
    });
  });

  /**
   * Add product to stock
   */
  addStock = asyncHandler(async (req, res) => {
    const result = await this.services.addToStock(req.params.id, req.body, req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Product stock added successfully!',
      data: result
    });
  });

  /**
   * Get all product of user with query
   */
  readAll = asyncHandler(async (req, res) => {
    const result = await this.services.readAll(req.query, req.user._id);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All products retrieved successfully',
      meta: {
        page,
        limit,
        total: result?.totalCount[0]?.total || 0,
        totalPage: Math.ceil(result?.totalCount[0]?.total / page)
      },
      data: result.data
    });
  });

  /**
   * Get total product
   */
  getTotalProduct = asyncHandler(async (req, res) => {
    const result = await this.services.countTotalProduct(req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Count total products successfully',
      data: result[0]
    });
  });

  /**
   * Get single product of user
   */
  readSingle = asyncHandler(async (req, res) => {
    const result = await this.services.read(req.params.id, req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Product fetched successfully!',
      data: result
    });
  });

  /**
   * update product
   */
  update = asyncHandler(async (req, res) => {
    const result = await this.services.update(req.params.id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Product updated successfully!',
      data: result
    });
  });

  /**
   * delete product
   */
  delete = asyncHandler(async (req, res) => {
    await this.services.delete(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Product delete successfully!'
    });
  });

  /**
   * delete multiple product
   */
  bulkDelete = asyncHandler(async (req, res) => {
    await this.services.bulkDelete(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Delete Selected Product successfully!'
    });
  });
}

const productControllers = new ProductControllers();
export default productControllers;
