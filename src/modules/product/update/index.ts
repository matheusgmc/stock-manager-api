import { prismaProductRepository } from "database/implements";
import { UpdateProductController } from "./update.controller";
import { UpdateProductUseCase } from "./update.usecase";
import { IUpdateProductRequestDTO } from "./update.dto";

const updateProductUseCase = new UpdateProductUseCase(prismaProductRepository);
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
