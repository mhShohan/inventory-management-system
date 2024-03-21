import { z } from 'zod';

const createSchema = z.object({
  name: z.string().optional(),
  email: z.string(),
  contactNo: z.string()
});

const updateSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  contactNo: z.string().optional()
});

const sellerValidator = { createSchema, updateSchema };
export default sellerValidator;
