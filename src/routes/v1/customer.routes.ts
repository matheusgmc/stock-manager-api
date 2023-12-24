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
    const { statusCode, error, data } = await customerController.create({
      body: req.body,
    });

    return res.status(statusCode).json(error ? { error } : data);
  }

  async find(req: Request, res: Response) {
    const { data, error, statusCode } = await customerController.find({
      query: req.query,
    });
    return res.status(statusCode).json(error ? { error } : data);
  }
}
