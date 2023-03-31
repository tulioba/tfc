import { Router } from 'express';
import UserController from '../controllers/user.controller';
import LoginValidation from '../validations/loginValidation';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', LoginValidation.loginValidade, userController.loginUser);

export default userRouter;
