export class ParamsRequiredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParamsRequired";
  }
}
