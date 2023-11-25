export class NotFoundError extends Error {
  constructor(message: string) {
    super(`${message.toUpperCase()}_NOT_FOUND`);
    this.name = "NotFound";
  }
}
