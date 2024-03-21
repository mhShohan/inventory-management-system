import { Router } from 'express';
import verifyAuth from '../../middlewares/verifyAuth';
import validateRequest from '../../middlewares/validateRequest';
import purchaseController from './purchase.controller';
import purchaseValidator from './purchase.validator';

const purchaseRoutes = Router();

purchaseRoutes.use(verifyAuth);

purchaseRoutes.post('/', validateRequest(purchaseValidator.createSchema), purchaseController.create);
purchaseRoutes.get('/', purchaseController.getAll);
purchaseRoutes.delete('/:id', purchaseController.delete);
purchaseRoutes.patch('/:id', validateRequest(purchaseValidator.updateSchema), purchaseController.create);

export default purchaseRoutes;
