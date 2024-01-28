import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import productValidator from './product.validator';
import productControllers from './product.controllers';
import verifyAuth from '../../middlewares/verifyAuth';

const productRoute = Router();

productRoute.use(verifyAuth);

productRoute.get('/total', productControllers.getTotalProduct);
productRoute.patch('/:id', validateRequest(productValidator.updateSchema), productControllers.update);
productRoute.get('/:id', productControllers.readSingle);
productRoute.delete('/:id', productControllers.delete);
productRoute.post('/', validateRequest(productValidator.createSchema), productControllers.create);
productRoute.get('/', productControllers.readAll);
productRoute.post('/bulk-delete', productControllers.bulkDelete);

export default productRoute;
