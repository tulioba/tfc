import { Router } from 'express';

import ValidateToken from '../auth/validateToken';
import MatchController from '../controllers/match.controller';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.get('/', matchController.getAllMatches);
matchRouter.patch('/:id/finish', ValidateToken.isAValideToken, matchController.updateMatch);
matchRouter.patch('/:id', ValidateToken.isAValideToken, matchController.updateScoreBoard);

export default matchRouter;
