import { Request, Response, Router } from "express";
import {
  createCustomerController,
  findCustomerController,
} from "modules/customer";

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
    const { data, error, statusCode } = await createCustomerController.handle({
      body: req.body,
    });
    return res.status(statusCode).json(error ? { error } : data);
  }

  async find(req: Request, res: Response) {
    const { data, error, statusCode } = await findCustomerController.handle({
      query: req.query,
    });

    return res.status(statusCode).json(error ? { error } : data);
  }
}
