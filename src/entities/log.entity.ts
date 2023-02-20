import { LogData } from "../database/entities/log.data.entity";
import { CustomerEntity } from "./customer.entity";
import { ProductEntity } from "./product.entity";

export interface ILogEntityNew {}

export class LogEntity {
  id: string;
  product: ProductEntity;
  customer: CustomerEntity;

  constructor(props: ILogEntityNew) {
    Object.assign(this, props);
  }

  static create(data: LogData): LogEntity {
    return new LogEntity(data);
  }
}
