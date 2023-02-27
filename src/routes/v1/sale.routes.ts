import { Request, Response, Router } from "express";
import { createSaleController } from "modules/sale";
import { findSaleController } from "modules/sale/find";

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
    const { data, error, statusCode } = await createSaleController.handle({
      body: req.body,
    });
    return res.status(statusCode).json(error ? { error } : data);
  }

  async find(req: Request, res: Response) {
    const { data, error, statusCode } = await findSaleController.handle({
      query: req.query,
    });
    return res.status(statusCode).json(error ? { error } : data);
  }
}
