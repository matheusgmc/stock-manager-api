import {
  createProductController,
  findProductController,
  updateProductControlerr,
} from "../../modules/product/";
import { Router, Request, Response } from "express";

export class ProductRoutes {
  router = Router();
  path = "/v1/product";
  constructor() {
    this.initialization();
  }

  initialization() {
    this.router.post(this.path, this.create);
    this.router.get(this.path, this.find);
    this.router.get(this.path + "/:id", this.findById);
    this.router.put(this.path + "/:id", this.update);
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

  async findById(req: Request, res: Response) {
    const { data, error, statusCode } = await findProductController.handle({
      query: req.params,
    });

    return res.status(statusCode).json(error ? { error } : data);
  }

  async update(req: Request, res: Response) {
    const { data, error, statusCode } = await updateProductControlerr.handle({
      params: req.params,
      body: req.body,
    });
    return res.status(statusCode).json(error ? { error } : data);
  }
}
