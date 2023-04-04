import Match from '../database/models/Match';
// import ErrorMessage from '../errorTypes/error.message';
import GoodStatus from '../errorTypes/statusOkTypes/status.type';

export default class MatchService {
  constructor(private matchModel = Match) {}

  public getAllMatches = async () => {
    const result = await this.matchModel.findAll();

    return { status: GoodStatus.ok, message: result };
  };
}
