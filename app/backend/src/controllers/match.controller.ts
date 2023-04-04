import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public getAllMatches = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = await this.matchService.getAllMatches();

      res.status(data.status).json(data.message);
    } catch (error) {
      next(error);
    }
  };
}
