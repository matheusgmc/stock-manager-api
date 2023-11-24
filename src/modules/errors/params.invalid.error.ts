export class ParamsInvalidError extends Error {
  constructor(message: string) {
    super(`${message.toUpperCase()}_PARAMS_INVALID`);
    this.name = "ParamsInvalid";
  }
}
