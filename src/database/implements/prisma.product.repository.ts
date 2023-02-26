import {
  IProductRepository,
  IProductRepositoryCreate,
  IProductRepositoryFindMany,
  IProductRepositoryFindUnique,
} from "repositories";
import { prisma } from "../../lib/prisma";
import { ProductData } from "../entities";

export class PrismaProductRepository implements IProductRepository {
  database = prisma.product;

  async create(data: IProductRepositoryCreate): Promise<ProductData> {
    const newProduct = await this.database.create({
      data: {
        name: data.name,
        amount: data.amount,
        price_unit: data.price_unit,
        updated_at: data.created_at,
        created_at: data.created_at,
      },
    });
    return new ProductData(newProduct);
  }

  async findMany(data: IProductRepositoryFindMany): Promise<ProductData[]> {
    return await this.database.findMany({
      where: data.where,
    });
  }
  async findUnique(
    data: IProductRepositoryFindUnique
  ): Promise<ProductData | null> {
    return await this.database.findUnique({
      where: data.where,
    });
  }
  async findAndUpdateName(
    id: string,
    name: string,
    updated_at: string
  ): Promise<void> {
    await this.database.update({
      where: { id },
      data: { name, updated_at },
    });
  }

  async findAndUpdateAmount(
    id: string,
    amount: number,
    updated_at: string
  ): Promise<void> {
    await this.database.update({ where: { id }, data: { amount, updated_at } });
  }
  async findAndUpdatePriceUnit(
    id: string,
    price_unit: number,
    updated_at: string
  ): Promise<void> {
    await this.database.update({
      where: { id },
      data: { price_unit, updated_at },
    });
  }

  async findByIdAndDelete(id: string): Promise<void> {
    await this.database.delete({ where: { id } });
  }
}
