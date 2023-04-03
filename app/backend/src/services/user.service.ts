import * as bcrypt from 'bcryptjs';
import ErrorMessage from '../errorTypes/error.message';
import User from '../database/models/User';
import { ILogin } from '../interfaces/index';
import ErrorStatus from '../errorTypes/error.status';
import GoodStatus from '../errorTypes/statusOkTypes/status.type';
import UserValidation from '../validations/userValidation';

export default class UserService {
  constructor(private userModel = User) { }

  public loginUser = async (user: ILogin) => {
    if (!UserValidation.valideUser(user.email, user.password)) {
      throw Object({
        status: ErrorStatus.statusUnauthorized,
        message: ErrorMessage.incorrectFields });
    }

    const result = await this.userModel.findOne({ where: { email: user.email } });

    if (!result) {
      throw Object({
        status: ErrorStatus.statusUnauthorized,
        message: ErrorMessage.incorrectFields });
    }

    const verifyHash = bcrypt.compareSync(user.password, result?.dataValues.password);

    if (!verifyHash) {
      throw Object({
        status: ErrorStatus.statusUnauthorized,
        message: ErrorMessage.incorrectFields });
    }

    return { status: GoodStatus.ok, message: result.dataValues };
  };
}
