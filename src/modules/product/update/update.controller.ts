import {
  BadRequest,
  IHttpRequest,
  IHttpResponse,
  OK,
  ServerError,
} from "../../../utils/http";
import { UpdateProductUseCase } from "./update.usecase";

export class UpdateProductController {
  constructor(private useCase: UpdateProductUseCase) {}
  async handle({ params, body }: IHttpRequest): Promise<IHttpResponse> {
    try {
      const response = await this.useCase.execute({
        id: params.id,
        data: body,
      });

      if (response instanceof Error) return BadRequest(response);

      return OK(response);
    } catch (err: any) {
      return ServerError("Internal");
    }
  }
}
