import { ProductData } from "database/entities";

export interface IProductEntityNew {
  id: string;
  name: string;
  price_unit: number;
  amount: number;
  created_at: string;
  updated_at: string;
}
export class ProductEntity implements IProductEntityNew {
  id: string;
  name: string;
  price_unit: number;
  amount: number;
  created_at: string;
  updated_at: string;

  constructor(props: IProductEntityNew) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  static create(data: ProductData): ProductEntity {
    const { name, price_unit, amount, id, created_at, updated_at } = data;
    if (!name) throw new Error("name is empty");
    if (!price_unit) throw new Error("price_unit is empty");
    if (!id) throw new Error("id is empty");
    if (!created_at) throw new Error("created_at is empty");
    if (!updated_at) throw new Error("updated_at is empty");

    return new ProductEntity({
      name,
      price_unit,
      amount,
      id,
      updated_at,
      created_at,
    });
  }
}
