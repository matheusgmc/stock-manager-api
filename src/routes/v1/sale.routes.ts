import { Request, Response, Router } from "express";
import { createSaleController } from "modules/sale";

export class SaleRoutes {
  router = Router();
  path = "/v1/sale";
  constructor() {
    this.initialization();
  }
  initialization() {
    this.router.post(this.path, this.create);
  }

  async create(req: Request, res: Response) {
    const { data, error, statusCode } = await createSaleController.handle({
      body: req.body,
    });
    return res.status(statusCode).json(error ? { error } : data);
  }
}
