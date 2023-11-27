import { Request, Response, Router } from "express";
import { customerController } from "modules/customer";
import { IHttpResponse } from "utils/http";

export class CustomerRoutes {
  router = Router();
  path = "/v1/customer";

  constructor() {
    this.initialization();
  }

  initialization() {
    this.router.post(this.path, this.create);
    this.router.get(this.path, this.find);
  }

  async create(req: Request, res: Response) {
    const result = await customerController.create({
      body: req.body,
    });

    return this.makeResponse(res, result);
  }

  async find(req: Request, res: Response) {
    const result = await customerController.find({
      query: req.query,
    });
    return this.makeResponse(res, result);
  }

  private makeResponse(res: Response, result: IHttpResponse) {
    return res
      .status(result.statusCode)
      .json(result.error ? { error: result.error } : result.data);
  }
}
