import { ControllerError } from "./controller.error";
export class InternalServerError extends Error implements ControllerError {
  constructor(reason: string) {
    super(reason);
    this.name = "InternalServerError";
  }
}
