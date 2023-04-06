import Match from '../database/models/Match';
import Team from '../database/models/Team';
import ErrorMessage from '../errorTypes/error.message';
import ErrorStatus from '../errorTypes/error.status';
import GoodStatus from '../errorTypes/statusOkTypes/status.type';
import { Idata, IScoreBody, ITeamBody } from '../interfaces/index';

export default class MatchService {
  constructor(private matchModel = Match, private teamModel = Team) {}

  public getAllMatches = async (): Promise<Idata> => {
    const result = await this.matchModel.findAll({
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });

    return { status: GoodStatus.ok, message: result };
  };

  public getMatchesByQuery = async (isBoolean: boolean): Promise<Idata> => {
    const result = await this.matchModel.findAll({
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
      where: {
        inProgress: isBoolean,
      },
    });

    return { status: GoodStatus.ok, message: result };
  };

  public updateMatch = async (id: string) => {
    await this.matchModel.update(
      { inProgress: false },
      { where: { id } },
    );

    return { status: GoodStatus.ok, message: 'Finished' };
  };

  public updateScoreBoard = async (id: string, body: IScoreBody) => {
    await this.matchModel.update(
      {
        homeTeamGoals: body.homeTeamGoals,
        awayTeamGoals: body.awayTeamGoals,
      },
      { where: { id } },
    );

    return { status: GoodStatus.ok, message: 'Touchdown' };
  };

  public addNewMatch = async (body: ITeamBody) => {
    if (body.homeTeamId === body.awayTeamId) {
      throw Object({
        status: ErrorStatus.teamsMustBeDifferents,
        message: ErrorMessage.noTwinsFairMatch });
    }

    const homeTeamExist = await this.teamModel.findByPk(body.awayTeamId);
    const awayTeamExist = await this.teamModel.findByPk(body.homeTeamId);

    if (!homeTeamExist || !awayTeamExist) {
      throw Object({ status: 404, message: 'There is no team with such id!' });
    }

    const response = await this.matchModel.create({
      homeTeamId: body.homeTeamId,
      awayTeamId: body.awayTeamId,
      homeTeamGoals: body.homeTeamGoals,
      awayTeamGoals: body.awayTeamGoals,
      inProgress: true,
    });

    return { status: GoodStatus.stored, message: response };
  };
}
