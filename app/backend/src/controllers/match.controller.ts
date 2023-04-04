import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/match.service';
// import { Idata } from '../interfaces/index';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public getAllMatches = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const queue = req.query.inProgress;

      if (!queue) {
        const data = await this.matchService.getAllMatches();

        return res.status(data.status).json(data.message);
      }

      const isBoolean = queue === 'true';

      console.log(isBoolean);
      const data = await this.matchService.getMatchesByQuery(isBoolean as boolean);
      res.status(data.status).json(data.message);
    } catch (error) {
      next(error);
    }
  };
}
