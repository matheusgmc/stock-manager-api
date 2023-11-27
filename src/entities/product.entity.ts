import crypto from "node:crypto";

export interface IProductEntityNew {
  id?: string;
  name: string;
  unit_price: number;
  amount?: number;
  created_at?: Date;
  updated_at?: Date;
}
export class ProductEntity {
  id: string;
  name: string;
  unit_price: number;
  amount: number;
  created_at: Date;
  updated_at: Date;

  constructor(props: IProductEntityNew) {
    this.id = props.id;
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

  static create(data: IProductEntityNew): ProductEntity {
    if (!data.id) {
      data.id = crypto.randomUUID();
    }

    if (!data.created_at && !data.updated_at) {
      data.created_at = new Date();
      data.updated_at = new Date();
    }

    if (!data.amount) {
      data.amount = 0;
    }

    return new ProductEntity(data);
  }
}
