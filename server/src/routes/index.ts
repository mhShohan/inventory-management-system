import { Router } from 'express';
import userRoutes from '../modules/user/user.routes';
import productRoute from '../modules/product/product.routes';
import saleRoutes from '../modules/sale/sale.routes';
import categoryRoutes from '../modules/category/category.routes';

const rootRouter = Router();

rootRouter.use('/users', userRoutes);
rootRouter.use('/products', productRoute);
rootRouter.use('/sales', saleRoutes);
rootRouter.use('/categories', categoryRoutes);

export default rootRouter;
