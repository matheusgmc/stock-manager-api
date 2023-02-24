export class DtoIsEmptyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DtoIsEmpty";
  }
}
