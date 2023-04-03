import { Router } from 'express';
import ValidateToken from '../auth/validateToken';
import UserController from '../controllers/user.controller';
import LoginValidation from '../validations/loginValidation';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', LoginValidation.loginValidade, userController.loginUser);
userRouter.get('/role', ValidateToken.isAValideToken, userController.valideUser);

export default userRouter;
