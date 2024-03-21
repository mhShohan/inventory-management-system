import { Router } from 'express';
import verifyAuth from '../../middlewares/verifyAuth';
import validateRequest from '../../middlewares/validateRequest';
import brandValidator from './brand.validator';
import brandController from './brand.controllers';

const brandRoutes = Router();

brandRoutes.use(verifyAuth);

brandRoutes.post('/', validateRequest(brandValidator.createSchema), brandController.create);
brandRoutes.get('/', brandController.getAll);
brandRoutes.delete('/:id', brandController.delete);
brandRoutes.patch('/:id', validateRequest(brandValidator.updateSchema), brandController.create);

export default brandRoutes;
