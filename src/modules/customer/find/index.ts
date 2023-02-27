import { FindCustomerUseCase } from "./find.usecase";
import { IFindCustomerRequestDTO } from "./find.dto";
import { FindCustomerController } from "./find.controller";
import { prismaCustomerRepository } from "database/implements";

const findCustomerUseCase = new FindCustomerUseCase(prismaCustomerRepository);

const findCustomerController = new FindCustomerController(findCustomerUseCase);

export {
  findCustomerUseCase,
  findCustomerController,
  FindCustomerUseCase,
  FindCustomerController,
  IFindCustomerRequestDTO,
};
