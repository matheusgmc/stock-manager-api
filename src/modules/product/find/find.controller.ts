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
      const data = await this.useCase.execute({
        id: query.id,
        name: query.name,
      });
      return OK(data);
    } catch (err: any) {
      if (err instanceof Error) return BadRequest(err);
      return ServerError(err.message);
    }
  }
}
