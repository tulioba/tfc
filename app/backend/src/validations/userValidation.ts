export default class UserValidation {
  public static validateEmail(email: string): boolean {
    const emailRegex = /\S+@\S+\.\S/;
    return emailRegex.test(email);
  }

  public static validatePassword(password: string): boolean | undefined {
    const minLength = 6;
    return (password.length >= minLength);
  }

  public static valideUser(
    email: string,
    password: string,
  ): boolean | undefined {
    return this.validateEmail(email) && this.validatePassword(password);
  }
}
