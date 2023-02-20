import { LogData } from "../database/entities/log.data.entity";
import { CustomerEntity, ProductEntity } from "../entities";

export interface ILogRepositoryCreate {
  product: ProductEntity;
  customer: CustomerEntity;
}

export interface ILogRepository {
  create(data: ILogRepositoryCreate): Promise<LogData>;
}
