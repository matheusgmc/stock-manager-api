import { IHistoryRepository } from "../../../implements";
import { ISalesHistoryRequestDTO } from "./sales.history.dto";

export class SalesHistoryUseCase {
  constructor(private HistoryRepository: IHistoryRepository) {}

  async execute(dto: ISalesHistoryRequestDTO): Promise<void> {
    if (Object.entries(dto).length == 0) throw new Error("dto isn't empty");

    if (!dto.sale || Object.entries(dto.sale).length == 0)
      throw new Error("sale isn't valid");

    const [today] = new Date().toLocaleString().split(" ");

    const historyIsExist = await this.HistoryRepository.findDate(today);
    if (historyIsExist) {
      await this.HistoryRepository.append({
        sale: dto.sale,
        id: historyIsExist.id,
      });
      return;
    }

    await this.HistoryRepository.create({
      sale: dto.sale,
      created_at: today,
    });

    return;
  }
}
