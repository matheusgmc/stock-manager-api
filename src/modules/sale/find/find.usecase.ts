import { SaleEntity } from "entities";
import { NotFoundError } from "modules/errors";
import { ISaleRepository } from "repositories/sale.repository.interface";
import { Validation } from "utils/validation";
import { IFindSaleRequestDTO } from "./find.dto";

export class FindSaleUseCase {
  constructor(private SaleRepository: ISaleRepository) {}
  async execute(
    dto: IFindSaleRequestDTO
  ): Promise<SaleEntity | SaleEntity[] | Error> {
    if (Validation.ObjectIsEmpty(dto)) {
      const sales = await this.SaleRepository.findMany({});
      return sales.map((sale) => SaleEntity.create(sale));
    }

    if (dto.id) {
      const sale = await this.SaleRepository.findUnique({
        where: dto,
      });
      if (!sale) return new NotFoundError("sale not found");
      return SaleEntity.create(sale);
    }

    const sales = await this.SaleRepository.findMany({});

    return sales.map((sale) => SaleEntity.create(sale));
  }
}
