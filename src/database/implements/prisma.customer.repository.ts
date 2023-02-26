import { prisma } from "lib/prisma";
import {
  ICustomerRepository,
  ICustomerRepositoryCreate,
  ICustomerRepositoryFindMany,
  ICustomerRepositoryFindUnique,
} from "repositories/customer.repository.interface";
import { CustomerData } from "../entities";

export class PrismaCustomerRepository implements ICustomerRepository {
  database = prisma.customer;
  async create(data: ICustomerRepositoryCreate): Promise<CustomerData> {
    const newCustomer = await this.database.create({
      data: {
        name: data.name,
      },
    });
    return new CustomerData(newCustomer);
  }

  async findMany(data: ICustomerRepositoryFindMany): Promise<CustomerData[]> {
    const customers = await this.database.findMany({
      where: data.where,
    });
    return customers.map((customer) => new CustomerData(customer));
  }

  async findUnique(
    data: ICustomerRepositoryFindUnique
  ): Promise<CustomerData | null> {
    const customer = await this.database.findUnique({
      where: data.where,
    });
    return customer ? new CustomerData(customer) : null;
  }
}
