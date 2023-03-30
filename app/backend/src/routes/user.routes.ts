import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.loginUser);

export default userRouter;
