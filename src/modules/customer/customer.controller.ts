import { DtoIsEmptyError } from "modules/errors";
import {
  IHttpResponse,
  IHttpRequest,
  OK,
  BadRequest,
  ServerError,
} from "utils/http";
import { CustomerUseCases } from "./customer.usecases";

export class CustomerController {
  constructor(private usecases: CustomerUseCases) { }

  async create(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { body } = req;
      if (Object.keys(body).length === 0) {
        return BadRequest(new DtoIsEmptyError("body"));
      }

      const result = await this.usecases.create(body);

      if (result instanceof Error) return BadRequest(result);

      return OK(result);
    } catch (err) {
      return ServerError(err.message);
    }
  }

  async find(req: IHttpRequest): Promise<IHttpResponse> {
    const { query } = req;

    if (Object.keys(query).length === 0) {
      return BadRequest(new DtoIsEmptyError("query"));
    }

    const { id } = query;
    const result = await this.usecases.findById({ id });

    if (result instanceof Error) return BadRequest(result);

    return OK(result);
  }
}
