export class AlreadyExistsError extends Error {
  constructor(message: string) {
    super(`${message.toUpperCase()}_ALREADY_EXISTS`);
    this.name = "AlreadyExists";
  }
}
