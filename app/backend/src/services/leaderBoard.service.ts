import Match from '../database/models/Match';
import Team from '../database/models/Team';
// import ErrorMessage from '../errorTypes/error.message';
// import ErrorStatus from '../errorTypes/error.status';
import GoodStatus from '../errorTypes/statusOkTypes/status.type';
import { ILBoard } from '../interfaces/index';

export default class LeaderBoardService {
  constructor(private leaderBoardModel = Match, private teamModel = Team) {}

  public getAllTeams = async () => {
    const result = await this.teamModel.findAll();

    return result;
  };

  public totalPoints = async () => {
    const matches = await this.leaderBoardModel.findAll({ where: { inProgress: false } });
    const teams = await this.getAllTeams();
    console.log(matches, teams.indexOf);
  };

  public getAllMatches = async () => {
    const teams = await this.getAllTeams();
    const score: ILBoard[] = [];
    teams.forEach((team) => {
      score.push({
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      });
    });

    return { status: GoodStatus.ok, message: score };
  };
}
