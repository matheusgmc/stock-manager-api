export interface ICreateSaleRequestDTO {
  customer_id: string;
  product_id: string;

  quantity_purchased: number;

  payment_status: string;
  payment_method: string;
}
