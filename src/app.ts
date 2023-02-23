import express, { Express } from "express";
import { ProductRoutes } from "./routes/v1";
export class App {
  app: Express;
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(new ProductRoutes().router);
  }

  listen(port: number) {
    this.app.listen(port, () => console.log(`server running on ${port}`));
  }
}
