import { SaleData } from "./sale.data.entity";

export class HistoryData {
  id: string;
  sales: SaleData[];
  created_at: string;
  updated_at: string;

  constructor(props: HistoryData) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
