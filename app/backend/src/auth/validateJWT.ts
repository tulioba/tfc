import * as jwt from 'jsonwebtoken';

// const createToken = (data: ILogin) => jwt.sign({ data }, secret, JWT_CONFIG);

// const verifyToken = (token: any) => jwt.verify(token, secret);

export default abstract class UserToken {
  private static secret = process.env.JWT_SECRET || 'NO KING RULES FOREVER';
  private static jwtConfig: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '10d' };

  static createToken = (data: string) => jwt.sign({ data }, this.secret, this.jwtConfig);

  static verifyToken = (token: string) => jwt.verify(token, this.secret);
}

// const JWT = {  userToken };
// export default JWT;
