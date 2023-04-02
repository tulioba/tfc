import { NextFunction, Request, Response } from 'express';
import ErrorMessage from '../errorTypes/error.message';
import { ILogin } from '../interfaces/index';
import ErrorStatus from '../errorTypes/error.status';

export default abstract class LoginValidation {
  static loginValidade = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const login: ILogin = req.body;
    try {
      if (!login.email || !login.password) {
        throw Object({
          status: ErrorStatus.statusBadRequest,
          message: ErrorMessage.allFieldesMustBeFilled });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
