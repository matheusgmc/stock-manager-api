import { prismaProductRepository } from "database/implements";
import { FindProductController } from "./find.controller";
import { FindProductUseCase } from "./find.usecase";

const findProductUseCase = new FindProductUseCase(prismaProductRepository);
const findProductController = new FindProductController(findProductUseCase);

export {
  findProductUseCase,
  findProductController,
  FindProductUseCase,
  FindProductController,
};
