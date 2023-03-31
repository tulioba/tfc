import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces/index';

export default abstract class LoginValidation {
  static loginValidade = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const login: ILogin = req.body;
    try {
      if (!login.email || !login.password) {
        throw Object({ status: 400, message: 'All fields must be filled' });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
