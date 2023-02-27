import { prismaProductRepository } from "database/implements";
import { CreateProductController } from "./create.controller";
import { CreateProductUseCase } from "./create.usecase";
import { ICreateProductRequestDTO } from "./create.dto";

const createProductUseCase = new CreateProductUseCase(prismaProductRepository);

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
