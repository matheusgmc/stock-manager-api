export interface IProductDataNew {
  id: string;
  name: string;
  price_unit: number;
  amount: number;
  created_at: string;
  updated_at: string;
}
export class ProductData implements IProductDataNew {
  id: string;
  name: string;
  price_unit: number;
  amount: number;
  created_at: string;
  updated_at: string;

  constructor(props: IProductDataNew) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
