import { NextFunction, Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  public getAllMatches = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.leaderBoardService.getAllMatches();

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
