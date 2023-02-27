import { SaleData } from "../database/entities";
import { SaleEntity } from "entities";

export type ISaleRepositoryCreate = Omit<SaleEntity, "id">;

export interface ISaleRepositoryFindUniqueData {
  where: Partial<Pick<SaleEntity, "id">>;
}

export interface ISaleRepositoryFindManyData {
  where?: {
    product_name?: string;
    customer_name?: string;
    total_price?: number;
    quantity_purchased?: number;
    created_at?: string;
    payment_method?: string;
    payment_status?: string;
  };
  between?: {
    date_start?: string;
    date_end?: string;
  };
}

export interface ISaleRepository {
  create(data: ISaleRepositoryCreate): Promise<SaleData>;
  findUnique(data: ISaleRepositoryFindUniqueData): Promise<SaleData | null>;
  findMany(data: ISaleRepositoryFindManyData): Promise<SaleData[]>;
}
