export class ParamsInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParamsInvalid";
  }
}
