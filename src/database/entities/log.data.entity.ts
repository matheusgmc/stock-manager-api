import { SaleData } from "./sale.data.entity";

export class LogData {
  id: string;
  sales: SaleData[];
  created_at: string;
  updated_at: string;

  constructor(props: LogData) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
