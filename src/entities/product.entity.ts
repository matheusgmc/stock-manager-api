import crypto from "node:crypto";

export interface IProductEntityNew {
  name: string;
  unit_price: number;
  amount?: number;
}

export interface IProductEntity {
  id: string;
  name: string;
  unit_price: number;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

export class ProductEntity implements IProductEntity {
  id: string;
  name: string;
  unit_price: number;
  amount: number;
  created_at: Date;
  updated_at: Date;

  constructor(props: Omit<IProductEntity, "id">, id?: string) {
    this.id = id || crypto.randomUUID();
    this.name = props.name;
    this.unit_price = props.unit_price;
    this.amount = props.amount;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  changeName(value: string) {
    this.name = value;
    this.updated_at = new Date();
  }

  changePrice(value: number) {
    this.unit_price = value;
    this.updated_at = new Date();
  }

  setAmount(value: number) {
    this.amount = value;
  }

  incrementAmount(value: number) {
    this.amount += value;
  }

  decrementAmount(value: number) {
    this.amount -= value;
  }

  static create(data: IProductEntityNew): ProductEntity | Error {
    const created_at = new Date();
    const updated_at = new Date();

    if (!data.amount) {
      data.amount = 0;
    }

    if (data.amount < 0) {
      return new Error("ERR_PRODUCT_AMOUNT_NEGATIVE");
    }

    return new ProductEntity({
      updated_at,
      created_at,
      amount: data.amount,
      unit_price: data.unit_price,
      name: data.name,
    });
  }

  static build(data: IProductEntity): ProductEntity {
    return new ProductEntity(data, data.id);
  }
}
