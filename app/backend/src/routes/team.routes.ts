import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get('/', teamController.getTeams);

export default teamRouter;
