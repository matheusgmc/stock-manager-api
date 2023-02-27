import { SaleEntity } from "entities/sale.entity";
import { ParamsInvalidError, ParamsRequiredError } from "modules/errors";
import { ISaleRepository } from "repositories/sale.repository.interface";
import { Validation } from "utils/validation";
import { IHistorySalesRequestDTO } from "./history.dto";

export class HistorySalesUseCase {
  constructor(private SalesRepository: ISaleRepository) {}

  async execute(dto: IHistorySalesRequestDTO): Promise<SaleEntity[] | Error> {
    if (Validation.ObjectIsEmpty(dto))
      return new ParamsRequiredError("date is required");

    if (!dto.date_start)
      return new ParamsRequiredError("date_start is required");

    const date_start = new Date(dto.date_start);
    if (date_start.toString() == "Invalid Date")
      return new ParamsInvalidError("date_start must be a date valid");

    if (dto.date_end && new Date(dto.date_end).toString() == "Invalid Date")
      return new ParamsInvalidError("date_end must be a date valid");

    let date_end = undefined;

    if (dto.date_end) {
      date_end = new Date(dto.date_end).setUTCHours(23, 59, 59);
    }

    const sales = await this.SalesRepository.findMany({
      between: {
        date_start: date_start.toISOString(),
        date_end: date_end ? new Date(date_end).toISOString() : date_end,
      },
    });

    return sales.map((sale) => SaleEntity.create(sale));
  }
}
