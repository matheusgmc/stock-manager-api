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
    const date_start = new Date(dto.date_start).toISOString();
    if (date_start == "Invalid Date")
      return new ParamsInvalidError("date_start must be a date valid");

    if (dto.date_end && new Date(dto.date_end).toString() == "Invalid Date")
      return new ParamsInvalidError("date_end must be a date valid");
    const date_end = new Date(dto.date_end).setUTCHours(23, 59, 59);

    const sales = await this.SalesRepository.findMany({
      between: {
        date_start,
        date_end: dto.date_end ? new Date(date_end).toISOString() : undefined,
      },
    });

    return sales.map((sale) => SaleEntity.create(sale));
  }
}
