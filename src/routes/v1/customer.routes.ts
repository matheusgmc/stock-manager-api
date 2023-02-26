import { Request, Response, Router } from "express";
import { createCustomerController } from "modules/customer";

export class CustomerRoutes {
  router = Router();
  path = "/v1/customer";

  constructor() {
    this.initialization();
  }

  initialization() {
    this.router.post(this.path, this.create);
  }

  async create(req: Request, res: Response) {
    const { data, error, statusCode } = await createCustomerController.handle({
      body: req.body,
    });
    return res.status(statusCode).json(error ? { error } : data);
  }
}
