import { SaleEntity } from "entities";
import { NotFoundError, ParamsInvalidError } from "modules/errors";
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
    if (dto.total_price && !Number(dto.total_price))
      return new ParamsInvalidError("total_price isn't a number");

    const sales = await this.SaleRepository.findMany({
      where: {
        created_at: dto.created_at,
        total_price: dto.total_price ? dto.total_price : undefined,
        product_name: dto.product_name,
        customer_name: dto.customer_name,
        quantity_purchased: dto.quantity_purchased,
        payment_status: dto.payment_status,
        payment_method: dto.payment_method,
      },
    });

    return sales.map((sale) => SaleEntity.create(sale));
  }
}
