import { ProductData } from "../database/entities/product.data.entity";

export interface IProductEntityNew {
  id: string;
  name: string;
  price_unit: number;
  amount: number;
}
export class ProductEntity implements IProductEntityNew {
  id: string;
  name: string;
  price_unit: number;
  amount: number;

  constructor(props: IProductEntityNew) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  static create(data: ProductData): ProductEntity {
    const { name, price_unit, amount: amount, id } = data;

    return new ProductEntity({
      name,
      price_unit,
      amount,
      id,
    });
  }
}
