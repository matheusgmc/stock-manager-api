import { PrismaProductRepository } from "database/implements/prisma.product.repository";
import { DeleteProductController } from "./delete.controller";
import { DeleteProductUseCase } from "./delete.usecase";
import { IDeleteProductRequestDTO } from "./delete.dto";

const prismaRepository = new PrismaProductRepository();

const deleteProductUseCase = new DeleteProductUseCase(prismaRepository);
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
