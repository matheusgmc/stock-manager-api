import { CreateCustomerUseCase } from "./create.usecase";
import { ICreateCustomerRequestDTO } from "./create.dto";
import { PrismaCustomerRepository } from "database/implements/prisma.customer.repository";
import { CreateCustomerController } from "./create.controller";

export const customerRepository = new PrismaCustomerRepository();

const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

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
