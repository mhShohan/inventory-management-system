import CustomError from './customError';

const handleCustomError = (err: CustomError) => {
  let errorResponse: Record<string, unknown> | null = {};

  if (err.type === 'WrongCredentials') {
    errorResponse = {
      email: {
        path: 'email',
        message: 'Wrong Credentials'
      },
      password: {
        path: 'password',
        message: 'Wrong Credentials'
      }
    };
  }

  if (err.type === 'Unauthorize') {
    errorResponse = { isAuthenticated: false };
  }

  if (err.type === 'NOT_FOUND') {
    errorResponse = {};
  }

  return errorResponse;
};

export default handleCustomError;
