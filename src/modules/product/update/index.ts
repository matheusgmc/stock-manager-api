import { PrismaProductRepository } from "database/implements";
import { UpdateProductController } from "./update.controller";
import { UpdateProductUseCase } from "./update.usecase";
import { IUpdateProductRequestDTO } from "./update.dto";

const ProductRepository = new PrismaProductRepository();
const updateProductUseCase = new UpdateProductUseCase(ProductRepository);
const updateProductController = new UpdateProductController(
  updateProductUseCase
);

export {
  updateProductUseCase,
  updateProductController,
  UpdateProductUseCase,
  UpdateProductController,
  IUpdateProductRequestDTO,
};
