import httpStatus from 'http-status';
import asyncHandler from '../../lib/asyncHandler';
import sendResponse from '../../lib/sendResponse';
import userServices from './user.services';

class UserControllers {
  private services = userServices;

  getSelf = asyncHandler(async (req, res) => {
    const result = await this.services.getSelf(req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User profile retrieved successfully!',
      data: result
    });
  });

  register = asyncHandler(async (req, res) => {
    const result = await this.services.register(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User registered successfully!',
      data: result
    });
  });

  login = asyncHandler(async (req, res) => {
    const result = await this.services.login(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User login successfully!',
      data: result
    });
  });
}

const userControllers = new UserControllers();
export default userControllers;
