import { CustomerEntity } from "entities/customer.entity";

export interface ICustomerRepositoryFindUnique {
  where: Partial<Pick<CustomerEntity, "id" | "name">>;
}

export interface ICustomerRepository {
  create(data: CustomerEntity): Promise<void>;
  findUnique(
    data: ICustomerRepositoryFindUnique,
  ): Promise<CustomerEntity | null>;
}
