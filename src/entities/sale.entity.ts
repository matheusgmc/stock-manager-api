import crypto from "node:crypto";
import {
  CustomerEntity,
  OrderEntity,
  PaymentEntity,
  ProductEntity,
} from "entities";
import { Entity } from "utils/types";

export interface ISaleEntityNew {
  orders: OrderEntity[];
  customer: CustomerEntity;
  payment: PaymentEntity;
}

export interface ISaleEntity {
  id: string;
  orders: Entity<ProductEntity>[];
  customer: Entity<CustomerEntity>;
  payment: PaymentEntity;
  total_price: number;
  created_at: Date;
}

export class SaleEntity implements ISaleEntity {
  id: string;
  orders: Entity<ProductEntity>[];
  customer: Entity<CustomerEntity>;
  payment: PaymentEntity;
  total_price: number;
  created_at: Date;

  constructor(props: Omit<ISaleEntity, "id">, id?: string) {
    this.id = id || crypto.randomUUID();
    this.orders = props.orders;
    this.customer = props.customer;
    this.payment = props.payment;
    this.total_price = props.total_price;
    this.created_at = props.created_at;
  }

  static create(data: ISaleEntityNew): SaleEntity | Error {
    const created_at = new Date();
    const total_price = data.orders.reduce(
      (acc, current) => acc + current.total_price,
      0,
    );

    if (Number.isNaN(total_price)) return new Error("TOTAL_PRICE_IS_INVALID");

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
