import Team from '../database/models/Team';

export default class TeamService {
  constructor(private teamModel = Team) { }

  public getTeams = async () => {
    const result = await this.teamModel.findAll();

    return { status: 200, message: result };
  };

  public getTeamById = async (id: string) => {
    const team = await this.teamModel.findByPk(id);

    if (!team) {
      const status = 401;
      const message = 'Team does not exist';
      throw Object({ status, message });
    }

    return { status: 200, message: team };
  };
}
