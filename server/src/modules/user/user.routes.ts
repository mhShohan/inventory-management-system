import { Router } from 'express';
import userControllers from './user.controllers';
import validateRequest from '../../middlewares/validateRequest';
import userValidator from './user.validator';
import verifyAuth from '../../middlewares/verifyAuth';

const userRoutes = Router();

userRoutes.post('/register', validateRequest(userValidator.registerSchema), userControllers.register);
userRoutes.post('/login', validateRequest(userValidator.loginSchema), userControllers.login);
userRoutes.get('/self', verifyAuth, userControllers.getSelf);
userRoutes.post('/:id', verifyAuth, validateRequest(userValidator.updatedProfileSchema), userControllers.updateProfile);

export default userRoutes;
