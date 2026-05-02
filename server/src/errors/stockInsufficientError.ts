import { IStockInsufficientItem } from '../modules/sale/sale.interface';

class StockInsufficientError extends Error {
  public statusCode: number;
  public type: string = 'STOCK_INSUFFICIENT';
  public insufficientItems: IStockInsufficientItem[];

  constructor(
    statusCode: number,
    message: string,
    insufficientItems: IStockInsufficientItem[],
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.insufficientItems = insufficientItems;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default StockInsufficientError;
