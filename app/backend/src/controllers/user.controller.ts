import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      console.log('ANTES DE ENTRAR NA SERVICE');
      const data = await this.userService.loginUser();
      console.log('SAINDO DA SERVICE');

      res.status(data.status).json(data.message);
    } catch (error) {
      next(error);
    }
  };
}
