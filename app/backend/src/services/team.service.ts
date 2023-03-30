import Team from '../database/models/Team';

export default class TeamService {
  constructor(private teamModel = Team) { }

  public getTeams = async () => {
    const result = await this.teamModel.findAll();

    return { status: 200, message: result };
  };
}
