import { CreateProductUseCase } from "./create.usecase";
import {
  IHttpResponse,
  IHttpRequest,
  Created,
  ServerError,
  BadRequest,
} from "../../../utils/http";

export class CreateProductController {
  constructor(private useCase: CreateProductUseCase) {}
  async handle({ body }: IHttpRequest): Promise<IHttpResponse> {
    try {
      const response = await this.useCase.execute(body);
      return Created(response);
    } catch (err: any) {
      if (err instanceof Error) {
        return BadRequest(err);
      }

      return ServerError(err.message);
    }
  }
}
