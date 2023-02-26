import { HistoryData } from "../database/entities/";
import { SaleEntity } from "entities";

export interface IHistoryEntityNew {
  id: string;
  sales: SaleEntity[];
  created_at: string;
  updated_at: string;
}

export class HistoryEntity implements IHistoryEntityNew {
  id: string;
  sales: SaleEntity[];
  created_at: string;
  updated_at: string;

  constructor(props: IHistoryEntityNew) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  static create(data: HistoryData): HistoryEntity {
    const sales = data.sales.map((elem) => SaleEntity.create(elem));

    return new HistoryEntity({
      ...data,
      sales,
    });
  }
}
