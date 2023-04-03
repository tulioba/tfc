import { ErrorRequestHandler } from 'express';

export interface IError extends ErrorRequestHandler {
  status: number;
  message: string;
}

export interface IUserLogin {
  email: string;
  _password: string;
}

// export interface LoginResult {
//   status: number;
//   message: User[];
// }

export interface ILogin {
  email: string;
  password: string;
}

// export interface ILoginResult {
//   status: number;
//   message: [];
// }

export interface IStatus {
  ok: number;
  statusBadRequest: number
}

export interface IUserEmail {
  email: string,
}
