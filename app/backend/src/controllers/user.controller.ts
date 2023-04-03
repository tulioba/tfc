import { NextFunction, Request, Response } from 'express';
import { ILogin, IUserEmail } from '../interfaces/index';
import UserService from '../services/user.service';
import UserToken from '../auth/validateJWT';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user: ILogin = req.body;

      const data = await this.userService.loginUser(user);

      const { email } = data.message;
      const token = UserToken.createToken(email);

      res.status(data.status).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public valideUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userEmail: IUserEmail = req.body.data.data;

      const data = await this.userService.userRole(userEmail);

      res.status(data.status).json({ role: data.message.role });
    } catch (error) {
      next(error);
    }
  };
}
