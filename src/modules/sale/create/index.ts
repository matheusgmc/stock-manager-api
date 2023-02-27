import { CreateSaleUseCase } from "./create.usecase";
import { ICreateSaleRequestDTO } from "./create.dto";
import { CreateSaleController } from "./create.controller";
import {
  prismaProductRepository,
  prismaSaleRepository,
  prismaCustomerRepository,
} from "database/implements";

const createSaleUseCase = new CreateSaleUseCase(
  prismaSaleRepository,
  prismaProductRepository,
  prismaCustomerRepository
);

const createSaleController = new CreateSaleController(createSaleUseCase);

export {
  createSaleUseCase,
  createSaleController,
  CreateSaleController,
  CreateSaleUseCase,
  ICreateSaleRequestDTO,
};
