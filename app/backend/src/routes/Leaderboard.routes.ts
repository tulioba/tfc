import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoard.controller';

const leaderBoardRouter = Router();

const leaderBoardController = new LeaderBoardController();

leaderBoardRouter.get('/home', leaderBoardController.getAllMatches);

export default leaderBoardRouter;
