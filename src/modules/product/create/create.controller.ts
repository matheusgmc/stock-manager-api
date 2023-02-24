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
      if (response instanceof Error) return BadRequest(response);

      return Created(response);
    } catch (err: any) {
      return ServerError("internal");
    }
  }
}
