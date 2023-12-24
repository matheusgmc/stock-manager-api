import {
  ICustomerRepository,
  ICustomerRepositoryFindUnique,
} from "repositories";
import { CustomerEntity } from "entities/customer.entity";

export class InMemoryCustomerRepository implements ICustomerRepository {
  private Customers: CustomerEntity[] = [
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
  ): Promise<CustomerEntity | null> {
    const customer = this.Customers.find(
      (elem) => elem.id == data.where.id || elem.name == data.where.name,
    );
    return customer ? customer : null;
  }
}
