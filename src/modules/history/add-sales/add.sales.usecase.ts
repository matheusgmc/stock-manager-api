import { SaleEntity } from "entities/sale.entity";
import { IHistoryRepository, ISaleRepository } from "repositories";
import { UtilsDate } from "../../../utils/date";
import { Validation } from "../../../utils/validation";
import { IAddSalesHistoryRequestDTO } from "./add.sales.dto";

export class AddSalesHistoryUseCase {
  constructor(
    private HistoryRepository: IHistoryRepository,
    private SaleRepository: ISaleRepository
  ) {}

  async execute(dto: IAddSalesHistoryRequestDTO): Promise<void> {
    if (Validation.ObjectIsEmpty(dto)) throw new Error("dto isn't empty");

    if (!dto.sale_id || typeof dto.sale_id !== "string")
      throw new Error("sale_id isn't valid");

    const saleIsExist = await this.SaleRepository.findUnique({
      where: {
        id: dto.sale_id,
      },
    });

    if (!saleIsExist) throw new Error("sale not found");

    const sale = SaleEntity.create(saleIsExist);

    const today = UtilsDate.getTodayWithoutHours();

    const historyIsExist = await this.HistoryRepository.findDate(today);
    if (historyIsExist) {
      await this.HistoryRepository.append({
        sale,
        id: historyIsExist.id,
      });
      return;
    }

    await this.HistoryRepository.create({
      sale,
      created_at: today,
    });

    return;
  }
}
