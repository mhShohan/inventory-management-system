class CustomError extends Error {
  public statusCode: number;
  public type: string = '';

  constructor(statusCode: number, message: string, type = '', stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.type = type;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default CustomError;
