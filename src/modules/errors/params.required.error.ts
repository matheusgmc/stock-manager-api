export class ParamsRequiredError extends Error {
  constructor(message: string) {
    super(`${message.toUpperCase()}_IS_REQUIRED`);
    this.name = "ParamsRequired";
  }
}
