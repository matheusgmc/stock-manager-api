import { CustomerData } from "database/entities";
import {
  ICustomerRepository,
  ICustomerRepositoryFindUnique,
} from "repositories";
import { CustomerEntity } from "entities/customer.entity";

export class InMemoryCustomerRepository implements ICustomerRepository {
  private Customers: CustomerData[] = [
    {
      id: "1",
      name: "test_mock_1",
    },
    {
      id: "2",
      name: "test_mock_2",
    },
  ];

  create(data: CustomerEntity): Promise<void> {
    this.Customers.push(data);

    return Promise.resolve();
  }

  async findUnique(
    data: ICustomerRepositoryFindUnique,
  ): Promise<CustomerData | null> {
    const customer = this.Customers.find(
      (elem) => elem.id == data.where.id || elem.name == data.where.name,
    );
    return customer ? customer : null;
  }
}
