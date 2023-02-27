import { FindSaleUseCase } from "./find.usecase";
import { IFindSaleRequestDTO } from "./find.dto";
import { FindSaleController } from "./find.controller";
import { prismaSaleRepository } from "database/implements/index";

const findSaleUseCase = new FindSaleUseCase(prismaSaleRepository);

const findSaleController = new FindSaleController(findSaleUseCase);

export {
  findSaleUseCase,
  findSaleController,
  FindSaleUseCase,
  IFindSaleRequestDTO,
  FindSaleController,
};
