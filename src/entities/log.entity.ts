import { LogData } from "../database/entities/";
import { SaleEntity } from "./sale.entity";

export interface ILogEntityNew {
  id: string;
  sales: SaleEntity[];
  created_at: string;
  updated_at: string;
}

export class LogEntity implements ILogEntityNew {
  id: string;
  sales: SaleEntity[];
  created_at: string;
  updated_at: string;

  constructor(props: ILogEntityNew) {
    Object.assign(this, props);
  }

  static create(data: LogData): LogEntity {
    return new LogEntity(data);
  }
}
