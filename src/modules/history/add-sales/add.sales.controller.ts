import { IHttpRequest, IHttpResponse, ServerError } from "utils/http";
import { AddSalesHistoryUseCase } from "./add.sales.usecase";

export class AddSalesHistoryController {
  constructor(private useCase: AddSalesHistoryUseCase) {}

  async handle({ params }: IHttpRequest): Promise<IHttpResponse> {
    try {
      await this.useCase.execute({
        sale_id: params.id,
      });
    } catch (err: any) {
      return ServerError("internal");
    }
  }
}
