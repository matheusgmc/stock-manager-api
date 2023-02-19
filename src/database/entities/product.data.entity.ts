export interface IProductDataNew {
  id: string;
  name: string;
  price_unit: number;
  amount: number;
}
export class ProductData implements IProductDataNew {
  id: string;
  name: string;
  price_unit: number;
  amount: number;

  constructor(props: IProductDataNew) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
