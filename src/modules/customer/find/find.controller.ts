import {
  BadRequest,
  IHttpRequest,
  IHttpResponse,
  OK,
  ServerError,
} from "utils/http";
import { FindCustomerUseCase } from "./find.usecase";

export class FindCustomerController {
  constructor(private useCase: FindCustomerUseCase) {}

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
