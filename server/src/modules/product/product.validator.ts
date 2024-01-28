import { z } from 'zod';

const createSchema = z.object({
  name: z.string(),
  color: z.string(),
  type: z.string(),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  bloomDate: z.string(),
  fragrance: z.string(),
  price: z.number().min(1, { message: 'Must be grater than 1!' }),
  quantity: z.number().min(1, { message: 'Must be grater than 1!' })
});

const updateSchema = z.object({
  name: z.string().optional(),
  color: z.string().optional(),
  type: z.string().optional(),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
  bloomDate: z.string().optional(),
  fragrance: z.string().optional(),
  price: z.number().min(1, { message: 'Must be grater than 1!' }).optional(),
  quantity: z.number().min(1, { message: 'Must be grater than 1!' }).optional()
});

const productValidator = { createSchema, updateSchema };
export default productValidator;
