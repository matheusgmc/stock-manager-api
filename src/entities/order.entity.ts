import crypto from "node:crypto";
import { Entity } from "utils/types";
import { ProductEntity } from "./product.entity";

export interface IOrderEntityNew {
  product: ProductEntity;
  qtd: number;
}

export interface IOrderEntity {
  id: string;
  product: Entity<ProductEntity>;
  qtd: number;
  total_price: number;
}

export class OrderEntity implements IOrderEntity {
  id: string;
  product: Entity<ProductEntity>;
  qtd: number;
  total_price: number;

  private constructor(props: Omit<IOrderEntity, "id">, id?: string) {
    this.id = id || crypto.randomUUID();
    this.product = props.product;
    this.qtd = props.qtd;
    this.total_price = props.total_price;
  }

  static create(data: IOrderEntityNew): OrderEntity | Error {
    const { product, qtd } = data;

    if (product.amount < qtd)
      return new Error("ERR_PRODUCT_AMOUNT_IS_NOT_ENOUGH");

    product.decrementAmount(qtd);

    const total_price = qtd * product.unit_price;

    if (Number.isNaN(total_price))
      return new Error("ERR_TOTAL_PRICE_IS_INVALID");

    return new OrderEntity({
      product,
      qtd,
      total_price,
    });
  }
}
