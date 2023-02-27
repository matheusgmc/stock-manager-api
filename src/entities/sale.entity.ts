import { PaymentEntity } from "entities";

import { SaleData } from "database/entities";
import { Validation } from "utils/validation";

type ISaleProduct = {
  name: string;
  price_unit: number;
  quantity_purchased: number;
};

type ISaleCustomer = {
  name: string;
};

export interface ISaleEntityNew {
  id: string;
  product: ISaleProduct;
  customer: ISaleCustomer;
  payment: PaymentEntity;
  total_price: number;
  created_at: string;
}

export class SaleEntity implements ISaleEntityNew {
  id: string;
  product: ISaleProduct;
  customer: ISaleCustomer;
  payment: PaymentEntity;
  total_price: number;
  created_at: string;

  constructor(props: ISaleEntityNew) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  static create(data: SaleData): SaleEntity {
    if (!data) throw new Error("data must not be empty to create a Sale");

    const product: ISaleProduct = {
      price_unit: data.product_price_unit,
      quantity_purchased: data.product_quantity_purchased,
      name: data.product_name,
    };

    const payment = PaymentEntity.create({
      method: data.payment_method,
      status: data.payment_status,
    });

    if (Validation.ObjectIsEmpty(product))
      throw new Error("product is required to create a Sale");

    const customer: ISaleCustomer = {
      name: data.customer_name,
    };

    if (Validation.ObjectIsEmpty(customer))
      throw new Error("customer is required to create a Sale");

    return new SaleEntity({
      payment,
      product,
      customer,
      id: data.id,
      total_price: data.total_price,
      created_at: data.created_at,
    });
  }
}
