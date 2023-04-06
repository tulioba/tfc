export default abstract class ErrorMessage {
  static readonly allFieldesMustBeFilled = 'All fields must be filled';
  static readonly incorrectFields = 'Invalid email or password';
  static readonly noTwinsFairMatch = 'It is not possible to create a match with two equal teams';
  static readonly teamDoesNotExist = 'There is no team with such id!';
}
