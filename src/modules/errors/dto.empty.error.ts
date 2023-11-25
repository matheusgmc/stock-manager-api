export class DtoIsEmptyError extends Error {
  constructor(message: string) {
    super(`${message.toUpperCase()}_DTO_IS_EMPTY`);
    this.name = "DtoIsEmpty";
  }
}
