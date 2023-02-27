import { prismaCustomerRepository } from "database/implements";

import { CreateCustomerUseCase } from "./create.usecase";
import { ICreateCustomerRequestDTO } from "./create.dto";
import { CreateCustomerController } from "./create.controller";

const createCustomerUseCase = new CreateCustomerUseCase(
  prismaCustomerRepository
);

const createCustomerController = new CreateCustomerController(
  createCustomerUseCase
);

export {
  createCustomerUseCase,
  createCustomerController,
  CreateCustomerController,
  CreateCustomerUseCase,
  ICreateCustomerRequestDTO,
};
