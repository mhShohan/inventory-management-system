import { ZodError } from 'zod';

const zodErrorSanitize = (err: ZodError) => {
  const errors = err.issues.reduce(
    (acc, cur) => {
      const path = cur.path[cur.path.length - 1];

      acc[path] = `${path} is ${cur.message}!`;

      return acc;
    },
    {} as Record<string, unknown>
  );

  return errors;
};

export default zodErrorSanitize;
