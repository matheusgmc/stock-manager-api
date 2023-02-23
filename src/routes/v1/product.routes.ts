import {
  createProductController,
  findProductController,
} from "../../modules/product/";
import { Router, Request, Response, query } from "express";

export class ProductRoutes {
  router = Router();
  path = "/v1/product";
  constructor() {
    this.initialization();
  }

  initialization() {
    this.router.post(this.path, this.create);
    this.router.get(this.path, this.find);
  }

  async create(req: Request, res: Response) {
    const { data, error, statusCode } = await createProductController.handle({
      body: req.body,
    });

    return res.status(statusCode).json(error ? { error } : data);
  }

  async find(req: Request, res: Response) {
    const { data, error, statusCode } = await findProductController.handle({
      query: req.query,
    });

    return res.status(statusCode).json(error ? { error } : data);
  }
}
