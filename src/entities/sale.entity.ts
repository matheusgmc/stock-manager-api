import crypto from "node:crypto";
import { CustomerEntity, PaymentEntity, ProductEntity } from "entities";
import { Entity } from "utils/types";

export interface ISaleEntityNew {
  product: ProductEntity;
  customer: CustomerEntity;
  payment: PaymentEntity;
  qtd: number;
}

export interface ISaleEntity {
  id: string;
  product: Entity<ProductEntity>;
  customer: Entity<CustomerEntity>;
  payment: PaymentEntity;
  total_price: number;
  qtd: number;
  created_at: Date;
}

export class SaleEntity implements ISaleEntity {
  id: string;
  product: Entity<ProductEntity>;
  customer: Entity<CustomerEntity>;
  payment: PaymentEntity;
  total_price: number;
  qtd: number;
  created_at: Date;

  constructor(props: Omit<ISaleEntity, "id">, id?: string) {
    this.id = id || crypto.randomUUID();
    this.product = props.product;
    this.customer = props.customer;
    this.payment = props.payment;
    this.total_price = props.total_price;
    this.qtd = props.qtd;
    this.created_at = props.created_at;
  }

  static create(data: ISaleEntityNew): SaleEntity | Error {
    if (data.product.amount < data.qtd)
      return new Error("ERR_PRODUCT_AMOUNT_IS_NOT_ENOUGH");

    const created_at = new Date();
    const total_price = data.product.unit_price * data.qtd;

    data.product.decrementAmount(data.qtd);

    return new SaleEntity({
      ...data,
      total_price,
      created_at,
    });
  }

  static build(data: ISaleEntity): SaleEntity {
    return new SaleEntity(data, data.id);
  }
}
