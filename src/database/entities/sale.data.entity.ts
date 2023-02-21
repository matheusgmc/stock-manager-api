import { CustomerData } from "./customer.data.entity";
import { ProductData } from "./product.data.entity";

export class SaleData {
  id: string;

  product: ProductData;

  customer: CustomerData;

  payment_status: string;
  payment_method: string;
  created_at: string;

  constructor(props: SaleData) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
