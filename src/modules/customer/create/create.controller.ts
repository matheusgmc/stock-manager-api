import {
  BadRequest,
  Created,
  IHttpRequest,
  IHttpResponse,
  ServerError,
} from "../../../utils/http";
import { CreateCustomerUseCase } from "./create.usecase";

export class CreateCustomerController {
  constructor(private useCase: CreateCustomerUseCase) {}
  async handle({ body }: IHttpRequest): Promise<IHttpResponse> {
    try {
      const response = await this.useCase.execute({
        name: body.name,
      });

      if (response instanceof Error) return BadRequest(response);

      return Created(response);
    } catch (err: any) {
      return ServerError(err.message);
    }
  }
}
