import { Request, Response } from 'express';

const notFound = (_req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    statusCode: 404,
    message: '404! Route Not found.'
  });
};

export default notFound;
