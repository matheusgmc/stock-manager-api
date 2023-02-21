import { SaleData } from "../database/entities/";
import { CustomerEntity } from "./customer.entity";
import { PaymentEntity } from "./payment.entity";
import { ProductEntity } from "./product.entity";

export interface ISaleEntityNew {
  id: string;
  product: ProductEntity;
  customer: CustomerEntity;
  payment: PaymentEntity;
  created_at: string;
}

export class SaleEntity implements ISaleEntityNew {
  id: string;
  product: ProductEntity;
  customer: CustomerEntity;
  payment: PaymentEntity;
  created_at: string;

  constructor(props: ISaleEntityNew) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  static create(data: SaleData): SaleEntity {
    if (!data) throw new Error("data must not be empty to create a Sale");

    const payment = PaymentEntity.create({
      method: data.payment_method,
      status: data.payment_status,
    });

    if (!data.product) throw new Error("product is required to create a Sale");

    if (!data.customer)
      throw new Error("customer is required to create a Sale");

    const product = ProductEntity.create(data.product);
    const customer = CustomerEntity.create(data.customer);

    return new SaleEntity({
      ...data,
      payment,
      product,
      customer,
    });
  }
}
