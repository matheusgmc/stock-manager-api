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
    Object.freeze(this);
  }

  static create(data: LogData): LogEntity {
    const sales = data.sales.map((elem) => SaleEntity.create(elem));

    return new LogEntity({
      ...data,
      sales,
    });
  }
}
