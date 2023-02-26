import { PrismaProductRepository } from "database/implements";
import { CreateProductController } from "./create.controller";
import { CreateProductUseCase } from "./create.usecase";
import { ICreateProductRequestDTO } from "./create.dto";

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
  ICreateProductRequestDTO,
};
