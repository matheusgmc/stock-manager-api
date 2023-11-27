import { DtoIsEmptyError, ParamsRequiredError } from "modules/errors";
import {
  BadRequest,
  IHttpRequest,
  IHttpResponse,
  OK,
  ServerError,
} from "utils/http";
import { ProductUseCases } from "./product.usecases";

export class ProductController {
  constructor(private productUseCases: ProductUseCases) { }

  async create(res: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { body } = res;

      if (Object.keys(body).length === 0)
        return BadRequest(new DtoIsEmptyError("body"));

      const result = await this.productUseCases.create(body);

      if (result instanceof Error) return BadRequest(result);

      return OK(result);
    } catch (err) {
      return ServerError(err.message);
    }
  }

  async update(res: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { params, body } = res;
      if (Object.keys(params).length === 0)
        return BadRequest(new ParamsRequiredError("id"));

      if (Object.keys(body).length === 0) {
        return BadRequest(new DtoIsEmptyError("body"));
      }

      const result = await this.productUseCases.update({
        id: params.id,
        data: body,
      });

      if (result instanceof Error) return BadRequest(result);

      return OK(result);
    } catch (err) {
      return ServerError(err.message);
    }
  }

  async find(res: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { query, params } = res;

      if (Object.keys(params).length !== 0) {
        const { id } = params;

        const result = await this.productUseCases.findById({ id });
        return result instanceof Error ? BadRequest(result) : OK(result);
      }

      if (Object.keys(query).length === 0)
        return BadRequest(new DtoIsEmptyError("query_params"));

      return OK([]);
    } catch (err) {
      return ServerError(err.message);
    }
  }
}
