import { DtoIsEmptyError } from "modules/errors";
import {
  BadRequest,
  IHttpRequest,
  IHttpResponse,
  OK,
  ServerError,
} from "utils/http";
import { SaleUseCases } from "./sale.usecases";

export class SaleController {
  constructor(private saleUseCases: SaleUseCases) { }

  async create(res: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { body } = res;

      if (Object.keys(body).length === 0)
        return BadRequest(new DtoIsEmptyError("body"));

      const result = await this.saleUseCases.create(body);

      if (result instanceof Error) return BadRequest(result);

      return OK(result);
    } catch (err) {
      return ServerError(err.message);
    }
  }

  async find(res: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { query } = res;

      if (Object.keys(query).length === 0)
        return BadRequest(new DtoIsEmptyError("query"));

      const { id, ...many } = query;

      if (id) {
        const result = await this.saleUseCases.findById({ id });
        if (result instanceof Error) return BadRequest(result);

        return OK(result);
      }

      const result = await this.saleUseCases.find(many);

      if (result instanceof Error) return BadRequest(result);

      return OK(result);
    } catch (err) {
      return ServerError(err.message);
    }
  }
}
