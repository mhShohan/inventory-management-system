import { z } from 'zod';

const saleItemSchema = z.object({
  product: z.string(),
  productName: z.string(),
  quantity: z.number().min(1, { message: '数量必须大于0' }),
  productPrice: z.number().min(1, { message: '价格必须大于0' })
});

const createSchema = z.object({
  product: z.string().optional(),
  productName: z.string().optional(),
  quantity: z.number().min(1, { message: 'Must be equal or grater than 1' }).optional(),
  productPrice: z.number().min(1, { message: 'Must be equal or grater than 1' }).optional(),
  items: z.array(saleItemSchema).optional(),
  buyerName: z.string(),
  date: z.string()
}).refine((data) => {
  return (data.product && data.productName && data.quantity && data.productPrice) || 
         (data.items && data.items.length > 0);
}, {
  message: '必须提供商品信息（单个商品或商品列表）',
  path: ['items']
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
