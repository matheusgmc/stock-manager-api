import { createProductController } from "../../modules/product/";
import { Router, Request, Response } from "express";

export class ProductRoutes {
  router = Router();
  path = "/v1/product";
  constructor() {
    this.initialization();
  }

  initialization() {
    this.router.post(this.path, this.create);
  }

  async create(req: Request, res: Response) {
    const { data, error, statusCode } = await createProductController.handle({
      body: req.body,
    });

    return res.status(statusCode).json(error ? { error } : data);
  }
}
