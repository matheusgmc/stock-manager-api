import {
  BadRequest,
  IHttpRequest,
  IHttpResponse,
  ServerError,
  OK,
} from "utils/http";
import { DeleteProductUseCase } from "./delete.usecase";

export class DeleteProductController {
  constructor(private useCase: DeleteProductUseCase) {}

  async handle({ params }: IHttpRequest): Promise<IHttpResponse> {
    try {
      const response = await this.useCase.execute({
        id: params.id,
      });
      if (response instanceof Error) return BadRequest(response);

      return OK(response);
    } catch (err: any) {
      return ServerError("internal");
    }
  }
}
