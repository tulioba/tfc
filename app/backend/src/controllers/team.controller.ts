import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/team.service';
// import UserValidation from '../validations/userValidation';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public getTeams = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.teamService.getTeams();
      res.status(200).json({ message: result });
    } catch (error) {
      next(error);
    }
  };
}
