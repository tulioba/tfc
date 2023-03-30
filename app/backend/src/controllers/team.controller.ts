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
      const data = await this.teamService.getTeams();
      res.status(data.status).json(data.message);
    } catch (error) {
      next(error);
    }
  };

  public getTeamById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.teamService.getTeamById(id);

      res.status(data.status).json(data.message);
    } catch (error) {
      next(error);
    }
  };
}
