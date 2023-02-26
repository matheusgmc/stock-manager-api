import { SaleData } from "../database/entities";
import { CustomerEntity, PaymentEntity, ProductEntity } from "entities";

export interface ISaleRepositoryCreate {
  customer: CustomerEntity;
  product: ProductEntity;
  payment: PaymentEntity;
  created_at: string;
}

export interface ISaleRepository {
  create(data: ISaleRepositoryCreate): Promise<SaleData>;
}
