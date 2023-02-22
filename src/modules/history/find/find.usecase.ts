import { HistoryEntity } from "../../../entities";
import { IHistoryRepository } from "../../../implements";
import { IFindHistoryRequestDTO } from "./find.dto";

export class FindHistoryUseCase {
  constructor(private HistoryRepository: IHistoryRepository) {}
  async execute(dto: IFindHistoryRequestDTO): Promise<HistoryEntity> {
    if (Object.entries(dto).length == 0) throw new Error("dto isn't empty");

    let history = null;

    if (dto.id) {
      history = await this.HistoryRepository.findById(dto.id);
    }

    if (dto.today) {
      history = await this.HistoryRepository.findDate(dto.today);
    }

    if (!history) throw new Error("history not found");

    return HistoryEntity.create(history);
  }
}
