import { CustomerData } from "./customer.data.entity";
import { ProductData } from "./product.data.entity";

export class LogData {
  id: string;
  customer: CustomerData;
  product: ProductData;
  constructor(props: LogData) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
