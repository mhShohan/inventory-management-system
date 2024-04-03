import { z } from 'zod';

const createSchema = z.object({
  product: z.string(),
  productName: z.string(),
  quantity: z.number().min(1, { message: 'Must be equal or grater than 1' }),
  productPrice: z.number().min(1, { message: 'Must be equal or grater than 1' }),
  buyerName: z.string(),
  date: z.string()
});

const updateSchema = z.object({
  product: z.string().optional(),
  quantity: z.number().min(1, { message: 'Must be equal or grater than 1' }).optional(),
  price: z.number().min(1, { message: 'Must be equal or grater than 1' }).optional(),
  buyerName: z.string().optional(),
  date: z.string().optional()
});

const saleValidator = { createSchema, updateSchema };
export default saleValidator;
