import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import productValidator from './product.validator';
import productControllers from './product.controllers';
import verifyAuth from '../../middlewares/verifyAuth';

const productRoute = Router();

productRoute.use(verifyAuth);

productRoute.get('/total', productControllers.getTotalProduct);
productRoute.post('/bulk-delete', productControllers.bulkDelete);
productRoute.post('/', validateRequest(productValidator.createSchema), productControllers.create);
productRoute.get('/', productControllers.readAll);
productRoute.patch('/:id/add', validateRequest(productValidator.addStockSchema), productControllers.addStock);
productRoute.patch('/:id', validateRequest(productValidator.updateSchema), productControllers.update);
productRoute.get('/:id', productControllers.readSingle);
productRoute.delete('/:id', productControllers.delete);

export default productRoute;
