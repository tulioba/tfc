import Match from '../database/models/Match';
import Team from '../database/models/Team';
// import ErrorMessage from '../errorTypes/error.message';
import GoodStatus from '../errorTypes/statusOkTypes/status.type';

export default class MatchService {
  constructor(private matchModel = Match) {}

  public getAllMatches = async () => {
    const result = await this.matchModel.findAll({ include: [{
      model: Team,
      as: 'homeTeam',
      attributes: ['teamName'],
    },
    {
      model: Team,
      as: 'awayTeam',
      attributes: ['teamName'],
    }] });

    return { status: GoodStatus.ok, message: result };
  };
}
