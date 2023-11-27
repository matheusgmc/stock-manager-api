import { ProductEntity } from "entities/product.entity";
import { prisma } from "lib/prisma";
import {
  IProductRepository,
  IProductRepositoryFindUnique,
} from "repositories/product.repository.interface";

export class PrismaProductRepository implements IProductRepository {
  private db = prisma.product;
  async create(data: ProductEntity): Promise<void> {
    await this.db.create({
      data: {
        id: data.id,
        name: data.name,
        amount: data.amount,
        created_at: data.created_at,
        unit_price: data.unit_price,
        updated_at: data.updated_at,
      },
    });
  }
  async update(data: ProductEntity): Promise<void> {
    await this.db.update({
      where: { id: data.id },
      data: {
        amount: data.amount,
        updated_at: data.updated_at,
        unit_price: data.unit_price,
        name: data.name,
        created_at: data.created_at,
      },
    });
  }
  async findUnique(
    data: IProductRepositoryFindUnique,
  ): Promise<ProductEntity | null> {
    const response = await this.db.findUnique({
      where: {
        id: data.where.id,
        name: data.where.name,
      },
    });
    return response ? new ProductEntity(response) : null;
  }
}
