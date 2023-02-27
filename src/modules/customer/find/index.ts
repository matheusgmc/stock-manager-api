import { FindCustomerUseCase } from "./find.usecase";
import { IFindCustomerRequestDTO } from "./find.dto";
import { FindCustomerController } from "./find.controller";
import { PrismaCustomerRepository } from "database/implements/prisma.customer.repository";

const customerRepository = new PrismaCustomerRepository();

const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

const findCustomerController = new FindCustomerController(findCustomerUseCase);

export {
  findCustomerUseCase,
  findCustomerController,
  FindCustomerUseCase,
  FindCustomerController,
  IFindCustomerRequestDTO,
};
