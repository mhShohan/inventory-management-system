import { Router } from 'express';
import userRoutes from '../modules/user/user.routes';
import productRoute from '../modules/product/product.routes';
import saleRoutes from '../modules/sale/sale.routes';

const rootRouter = Router();

rootRouter.use('/users', userRoutes);
rootRouter.use('/products', productRoute);
rootRouter.use('/sales', saleRoutes);

export default rootRouter;
