import mongoose from 'mongoose';

const validationError = (error: mongoose.Error.ValidationError) => {
  const errRes = Object.keys(error.errors).reduce(
    (acc, cur) => {
      acc[error.errors[cur].path] = error.errors[cur].message;

      return acc;
    },
    {} as Record<string, unknown>
  );

  return errRes;
};

export default validationError;
