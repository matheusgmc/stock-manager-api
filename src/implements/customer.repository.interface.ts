import { CustomerData } from "../database/entities/customer.data.entity";

export type ICustomerRepositoryCreate = Omit<CustomerData, "id">;

export interface ICustomerRepositoryFindUnique {
  where: Partial<Pick<CustomerData, "id">>;
}

export interface ICustomerRepositoryFindMany {
  where: Partial<CustomerData>;
}

export interface ICustomerRepository {
  create(data: ICustomerRepositoryCreate): Promise<CustomerData>;

  findUnique(data: ICustomerRepositoryFindUnique): Promise<CustomerData | null>;
  findMany(data: ICustomerRepositoryFindMany): Promise<CustomerData[]>;
}
