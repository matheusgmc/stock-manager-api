import { LogData } from "../database/entities";
import { SaleEntity } from "../entities";

export interface ILogRepositoryCreate {
  sale: SaleEntity;
  created_at: string;
}

export interface ILogRepositoryAppend {
  id: string;
  sale: SaleEntity;
}

export interface ILogRepository {
  create(data: ILogRepositoryCreate): Promise<void>;
  append(data: ILogRepositoryAppend): Promise<void>;

  findToday(today: string): Promise<LogData | null>;
}
