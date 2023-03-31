import User from '../database/models/User';
import { ILogin } from '../interfaces/index';

export default class UserService {
  constructor(private userModel = User) { }

  public loginUser = async (user: ILogin) => {
    const result = await this.userModel.findOne({ where: { email: user.email } });

    if (!result) {
      throw Object({ status: 400, message: '"EMAIL" or/and "PASSWORD" are incorrects' });
    }

    return { status: 200, message: result.dataValues };
  };
}
