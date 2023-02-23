export class AlreadyExistsError extends Error {
  constructor(message: string) {
    super(message + " already exists");
    this.name = "AlreadyExists";
  }
}
