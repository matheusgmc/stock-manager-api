import { PrismaProductRepository } from "../../../database";
import { UpdateProductController } from "./update.controller";
import { UpdateProductUseCase } from "./update.usecase";

const ProductRepository = new PrismaProductRepository();
const updateProductUseCase = new UpdateProductUseCase(ProductRepository);
const updateProductControlerr = new UpdateProductController(
  updateProductUseCase
);

export {
  updateProductUseCase,
  updateProductControlerr,
  UpdateProductUseCase,
  UpdateProductController,
};
