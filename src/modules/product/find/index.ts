import { PrismaProductRepository } from "database/implements";
import { FindProductController } from "./find.controller";
import { FindProductUseCase } from "./find.usecase";

const ProductRepository = new PrismaProductRepository();

const findProductUseCase = new FindProductUseCase(ProductRepository);
const findProductController = new FindProductController(findProductUseCase);

export {
  findProductUseCase,
  findProductController,
  FindProductUseCase,
  FindProductController,
};
