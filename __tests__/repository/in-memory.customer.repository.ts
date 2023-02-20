import { randomUUID } from "node:crypto";
import { CustomerData } from "../../src/database/entities/customer.data.entity";
import {
  ICustomerRepository,
  ICustomerRepositoryCreate,
  ICustomerRepositoryFindMany,
  ICustomerRepositoryFindUnique,
} from "../../src/implements/customer.repository.interface";

const Customers: CustomerData[] = [
  {
    id: "1",
    name: "test_mock_1",
  },
  {
    id: "2",
    name: "test_mock_2",
  },
];

export class InMemoryCustomerRepository implements ICustomerRepository {
  async create(data: ICustomerRepositoryCreate): Promise<CustomerData> {
    const newCustomer: CustomerData = {
      id: randomUUID(),
      name: data.name,
    };

    Customers.push(newCustomer);

    return new CustomerData(newCustomer);
  }

  async findUnique(
    data: ICustomerRepositoryFindUnique
  ): Promise<CustomerData | null> {
    const customer = Customers.find(
      (elem) => elem.id == data.where.id || elem.name == data.where.name
    );
    return customer ? customer : null;
  }

  async findMany(data: ICustomerRepositoryFindMany): Promise<CustomerData[]> {
    const customers: CustomerData[] = [];

    if (Object.entries(data.where).length == 0)
      return Customers.map((elem) => new CustomerData(elem));

    Customers.forEach((customer) => {
      if (customer.name == data.where.name || customer.id == data.where.id) {
        customers.push(customer);
      }
    });
    return customers;
  }
}
