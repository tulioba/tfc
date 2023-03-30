// import Team from '../database/models/Team';
import User from '../database/models/User';

export default class UserService {
  constructor(private userModel = User) { }

  public loginUser = async () => {
    console.log('ENTROU');
    const result = await this.userModel.findByPk(1);
    console.log('SAIU');

    return { status: 200, message: result };
  };
}
