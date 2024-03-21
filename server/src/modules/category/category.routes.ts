import { Router } from 'express';
import verifyAuth from '../../middlewares/verifyAuth';
import validateRequest from '../../middlewares/validateRequest';
import categoryValidator from './category.validator';
import categoryController from './category.controllers';

const categoryRoutes = Router();

categoryRoutes.use(verifyAuth);

categoryRoutes.post('/', validateRequest(categoryValidator.createSchema), categoryController.create);
categoryRoutes.get('/', categoryController.getAll);
categoryRoutes.delete('/:id', categoryController.delete);
categoryRoutes.patch('/:id', validateRequest(categoryValidator.updateSchema), categoryController.create);

export default categoryRoutes;
