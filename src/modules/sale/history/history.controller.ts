import {
  BadRequest,
  IHttpRequest,
  IHttpResponse,
  OK,
  ServerError,
} from "utils/http";
import { HistorySalesUseCase } from "./history.usecase";

export class HistorySalesController {
  constructor(private useCase: HistorySalesUseCase) {}
  async handle({ query }: IHttpRequest): Promise<IHttpResponse> {
    try {
      const response = await this.useCase.execute({
        date_start: query.date_start,
        date_end: query.date_end,
      });
      if (response instanceof Error) return BadRequest(response);

      return OK(response);
    } catch (err: any) {
      console.log(err);
      return ServerError("internal");
    }
  }
}
