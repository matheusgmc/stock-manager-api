import {
  BadRequest,
  IHttpRequest,
  IHttpResponse,
  OK,
  ServerError,
} from "../../../utils/http";
import { FindProductUseCase } from "./find.usecase";

export class FindProductController {
  constructor(private useCase: FindProductUseCase) {}
  async handle({ query }: IHttpRequest): Promise<IHttpResponse> {
    try {
      const response = await this.useCase.execute({
        id: query.id,
        name: query.name,
      });

      if (response instanceof Error) return BadRequest(response);

      return OK(response);
    } catch (err: any) {
      return ServerError("internal");
    }
  }
}
