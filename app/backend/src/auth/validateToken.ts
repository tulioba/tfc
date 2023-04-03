import { NextFunction, Request, Response } from 'express';
import UserToken from './validateJWT';
import ErrorStatus from '../errorTypes/error.status';

export default abstract class ValidateToken {
  public static isAValideToken = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(ErrorStatus.statusTokenNotFound).json({ message: 'Token not found' });
      }
      const payload = UserToken.verifyToken(authorization);

      req.body.data = payload;

      next();
    } catch (error) {
      return res.status(ErrorStatus.statusTokenMustBeValid)
        .json({ message: 'Token must be a valid token' });
    }
  };
}
