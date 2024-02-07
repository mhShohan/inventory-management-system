import { z } from 'zod';

const createSchema = z.object({
  name: z.string(),
  amount: z.number().min(1, { message: 'Must be equal or grater than 1' }),
  paid: z.number().min(0, { message: 'Must be equal or grater than 0' }),
  date: z.string()
});

const updateSchema = z.object({
  name: z.string().optional(),
  amount: z.number().min(1, { message: 'Must be equal or grater than 1' }).optional(),
  paid: z.number().min(0, { message: 'Must be equal or grater than 0' }).optional(),
  date: z.string().optional()
});

const sellerValidator = { createSchema, updateSchema };
export default sellerValidator;
