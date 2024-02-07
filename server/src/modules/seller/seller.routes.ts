import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import verifyAuth from '../../middlewares/verifyAuth';
import sellerValidator from './seller.validator';
import sellerControllers from './seller.controllers';

const sellerRoutes = Router();

sellerRoutes.use(verifyAuth);

sellerRoutes.post('/', validateRequest(sellerValidator.createSchema), sellerControllers.create);
sellerRoutes.get('/', sellerControllers.readAll);
sellerRoutes.patch('/:id', validateRequest(sellerValidator.updateSchema), sellerControllers.update);
sellerRoutes.get('/:id', sellerControllers.readSingle);
sellerRoutes.delete('/:id', sellerControllers.delete);

export default sellerRoutes;
