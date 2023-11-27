import { CustomerEntity } from "entities/customer.entity";
import { prisma } from "lib/prisma";
import {
  ICustomerRepository,
  ICustomerRepositoryFindUnique,
} from "repositories/customer.repository.interface";

export class PrismaCustomerRepository implements ICustomerRepository {
  private db = prisma;
  async create(data: CustomerEntity): Promise<void> {
    await this.db.customer.create({
      data: {
        id: data.id,
        name: data.name,
      },
    });
  }
  async findUnique(
    data: ICustomerRepositoryFindUnique,
  ): Promise<CustomerEntity | null> {
    return await this.db.customer.findUnique({
      where: data.where,
    });
  }
}
