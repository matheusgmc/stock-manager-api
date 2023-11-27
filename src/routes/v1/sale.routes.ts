import { Request, Response, Router } from "express";
import { saleController } from "modules/sale";

export class SaleRoutes {
  router = Router();
  path = "/v1/sale";
  constructor() {
    this.initialization();
  }
  initialization() {
    this.router.post(this.path, this.create);
    this.router.get(this.path, this.find);
  }

  async create(req: Request, res: Response) {
    const { data, error, statusCode } = await saleController.create({
      body: req.body,
    });
    return res.status(statusCode).json(error ? { error } : data);
  }

  async find(req: Request, res: Response) {
    const { data, error, statusCode } = await saleController.find({
      query: { ...req.query, ...req.params },
    });
    return res.status(statusCode).json(error ? { error } : data);
  }
}
