import { IPaymentMethod, IPaymentStatus, SaleEntity } from "entities";

export interface ISaleRepositoryFindUniqueData {
  where: Partial<Pick<SaleEntity, "id">>;
}

export interface ISaleRepositoryFindManyData {
  where: {
    product_id?: string;
    customer_id?: string;
    payment_method?: IPaymentMethod;
    payment_status?: IPaymentStatus;
  };
}
export interface ISaleRepository {
  create(data: SaleEntity): Promise<void>;
  findUnique(data: ISaleRepositoryFindUniqueData): Promise<SaleEntity | null>;

  findMany(data: ISaleRepositoryFindManyData): Promise<SaleEntity[]>;
}
