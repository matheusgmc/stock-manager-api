import { Router, Request, Response } from "express";
import { productController } from "modules/product";

export class ProductRoutes {
  router = Router();
  path = "/v1/product";
  constructor() {
    this.initialization();
  }

  initialization() {
    this.router.post(this.path, this.create);
    this.router.get(this.path + "/:id", this.findById);
    this.router.put(this.path + "/:id", this.update);
  }

  async create(req: Request, res: Response) {
    const { data, error, statusCode } = await productController.create({
      body: req.body,
    });

    return res.status(statusCode).json(error ? { error } : data);
  }

  async findById(req: Request, res: Response) {
    const { data, error, statusCode } = await productController.find({
      params: req.params,
    });

    return res.status(statusCode).json(error ? { error } : data);
  }

  async update(req: Request, res: Response) {
    const { data, error, statusCode } = await productController.update({
      params: req.params,
      body: req.body,
    });
    return res.status(statusCode).json(error ? { error } : data);
  }
}
