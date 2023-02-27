import {
  BadRequest,
  IHttpRequest,
  IHttpResponse,
  OK,
  ServerError,
} from "utils/http";
import { FindSaleUseCase } from "./find.usecase";

export class FindSaleController {
  constructor(private useCase: FindSaleUseCase) {}

  async handle({ query }: IHttpRequest): Promise<IHttpResponse> {
    try {
      const response = await this.useCase.execute(query);

      if (response instanceof Error) return BadRequest(response);

      return OK(response);
    } catch (err: any) {
      return ServerError("internal");
    }
  }
}
