import { prismaProductRepository } from "database/implements";

import { DeleteProductController } from "./delete.controller";
import { DeleteProductUseCase } from "./delete.usecase";
import { IDeleteProductRequestDTO } from "./delete.dto";

const deleteProductUseCase = new DeleteProductUseCase(prismaProductRepository);
const deleteProductController = new DeleteProductController(
  deleteProductUseCase
);

export {
  deleteProductUseCase,
  deleteProductController,
  DeleteProductController,
  DeleteProductUseCase,
  IDeleteProductRequestDTO,
};
