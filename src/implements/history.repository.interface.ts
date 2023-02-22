import { HistoryData } from "../database/entities";
import { SaleEntity } from "../entities";

export interface IHistoryRepositoryCreate {
  sale: SaleEntity;
  created_at: string;
}

export interface IHistoryRepositoryAppend {
  id: string;
  sale: SaleEntity;
}

export interface IHistoryRepository {
  create(data: IHistoryRepositoryCreate): Promise<void>;
  append(data: IHistoryRepositoryAppend): Promise<void>;

  findToday(today: string): Promise<HistoryData | null>;
}
