import {
  BadRequest,
  Created,
  IHttpRequest,
  IHttpResponse,
  ServerError,
} from "utils/http";
import { CreateSaleUseCase } from "./create.usecase";

export class CreateSaleController {
  constructor(private useCase: CreateSaleUseCase) {}

  async handle({ body }: IHttpRequest): Promise<IHttpResponse> {
    try {
      const response = await this.useCase.execute({
        product_id: body.product_id,
        customer_id: body.customer_id,
        payment_method: body.payment_method,
        payment_status: body.payment_status,
      });

      if (response instanceof Error) return BadRequest(response);

      return Created(response);
    } catch (err: any) {
      return ServerError("internal");
    }
  }
}
