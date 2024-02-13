import { Response } from 'express';

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: IMeta;
}

interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const sendResponse = <T>(res: Response, responses: IResponse<T>) => {
  return res.status(responses.statusCode).json({
    statusCode: responses.statusCode,
    success: responses.success,
    message: responses.message,
    meta: responses.meta,
    data: responses.data
  });
};

export default sendResponse;
