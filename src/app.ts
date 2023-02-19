import express, { Express } from "express";
export class App {
  app: Express;
  constructor() {
    this.app = express();
  }

  listen(port: number) {
    this.app.listen(port, () => console.log(`server running on ${port}`));
  }
}
