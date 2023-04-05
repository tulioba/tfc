import { ErrorRequestHandler } from 'express';
import Match from '../database/models/Match';

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

export interface IInProgress {
  inProgress: boolean | string | string[],
}

export interface Idata {
  status: number,
  message: Match[] | void,
}

export interface IStatus200 {
  status: number,
  message: string,

}

export interface IBody {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IParams {
  id: string
}
