import { ErrorRequestHandler } from 'express';

export interface IError extends ErrorRequestHandler {
  status: number;
  message: string;
}
