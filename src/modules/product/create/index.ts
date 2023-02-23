import { PrismaProductRepository } from "../../../database";
import { CreateProductController } from "./create.controller";
import { CreateProductUseCase } from "./create.usecase";

const ProductRepository = new PrismaProductRepository();
const createProductUseCase = new CreateProductUseCase(ProductRepository);

const createProductController = new CreateProductController(
  createProductUseCase
);

export {
  createProductUseCase,
  createProductController,
  CreateProductUseCase,
  CreateProductController,
};
