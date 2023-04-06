import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/match.service';
// import { IParams, IBody, RequestBody } from '../interfaces/index';

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

      const data = await this.matchService.getMatchesByQuery(isBoolean as boolean);
      res.status(data.status).json(data.message);
    } catch (error) {
      next(error);
    }
  };

  public updateMatch = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const data = await this.matchService.updateMatch(id);

      res.status(data.status).json({ message: data.message });
    } catch (error) {
      next(error);
    }
  };

  public updateScoreBoard = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;

      const data = await this.matchService.updateScoreBoard(id, req.body);

      res.status(data.status).json({ message: data.message });
    } catch (error) {
      next(error);
    }
  };

  public addNewMatch = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.matchService.addNewMatch(req.body);

      res.status(data.status).json(data.message);
    } catch (error) {
      next(error);
    }
  };
}
