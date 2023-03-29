export default class UserValidation {
  public static validateEmail(email: string): boolean {
    const emailRegex = /\S+@\S+\.\S/;
    return emailRegex.test(email);
  }

  public static validatePassword(password: string): boolean {
    const passwordRegex = /^[0-9]+$/; /* Senha pode ter apenas nÃºmeros */
    return passwordRegex.test(password);
  }

  public static validateUser(
    email: string,
    password: string,
  ): boolean {
    return this.validateEmail(email) && this.validatePassword(password);
  }
}
