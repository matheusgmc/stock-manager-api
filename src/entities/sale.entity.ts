import crypto from "node:crypto";
import {
  CustomerEntity,
  ICustomerEntityNew,
  IPaymentEntityNew,
  IProductEntityNew,
  PaymentEntity,
  ProductEntity,
} from "entities";

export interface ISaleEntityNew {
  id?: string;
  total_price?: number;
  created_at?: Date;

  product: ProductEntity;
  customer: CustomerEntity;
  payment: PaymentEntity;
  qtd: number;
}

export class SaleEntity {
  id: string;
  product: ProductEntity;
  customer: CustomerEntity;
  payment: PaymentEntity;
  total_price: number;
  qtd: number;
  created_at: Date;

  constructor(props: ISaleEntityNew) {
    Object.assign(this, props);
  }

  static create(data: ISaleEntityNew): SaleEntity | Error {
    if (data.product.amount < data.qtd)
      return new Error("ERR_PRODUCT_AMOUNT_IS_NOT_ENOUGH");

    if (!data.id) {
      data.id = crypto.randomUUID();
    }

    if (!data.created_at) {
      data.created_at = new Date();
    }

    if (!data.total_price) {
      data.total_price = data.product.unit_price * data.qtd;
    }

    data.product.decrementAmount(data.qtd);

    return new SaleEntity(data);
  }
}
