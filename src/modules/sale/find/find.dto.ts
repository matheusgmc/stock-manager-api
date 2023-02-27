export interface IFindSaleRequestDTO {
  id?: string;
  product_name?: string;
  customer_name?: string;
  created_at?: string;
  total_price?: number;
  quantity_purchased?: number;
  payment_method?: string;
  payment_status?: string;
}
