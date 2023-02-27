export class SaleData {
  id: string;
  product_name: string;
  product_price_unit: number;
  product_quantity_purchased: number;

  customer_name: string;

  payment_status: string;
  payment_method: string;
  total_price: number;

  created_at: string;

  constructor(props: SaleData) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
