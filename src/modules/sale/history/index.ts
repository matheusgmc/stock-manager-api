import { HistorySalesUseCase } from "./history.usecase";
import { IHistorySalesRequestDTO } from "./history.dto";
import { HistorySalesController } from "./history.controller";
import { prismaSaleRepository } from "database/implements/index";

const historySalesUseCase = new HistorySalesUseCase(prismaSaleRepository);
const historySalesController = new HistorySalesController(historySalesUseCase);

export {
  historySalesUseCase,
  historySalesController,
  HistorySalesController,
  HistorySalesUseCase,
  IHistorySalesRequestDTO,
};
