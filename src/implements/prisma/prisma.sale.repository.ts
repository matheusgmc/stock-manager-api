import { Sale } from "@prisma/client";
import { PaymentEntity } from "entities/payment.entity";
import { SaleEntity } from "entities/sale.entity";
import { prisma } from "lib/prisma";
import {
  ISaleRepository,
  ISaleRepositoryFindManyData,
  ISaleRepositoryFindUniqueData,
} from "repositories/sale.repository.interface";

export class PrismaSaleRepository implements ISaleRepository {
  private db = prisma.sale;

  async create(data: SaleEntity): Promise<void> {
    await this.db.create({
      data: {
        id: data.id,
        total_price: data.total_price,
        payment_status: data.payment.status,
        payment_method: data.payment.method,
        created_at: data.created_at,
        qtd: data.qtd,
        product: {
          connect: { id: data.product.id },
        },
        customer: {
          connect: { id: data.customer.id },
        },
      },
    });
  }
  async findMany(data: ISaleRepositoryFindManyData): Promise<SaleEntity[]> {
    const sale = await this.db.findMany({
      where: data.where,
    });
    return sale.map((e) => this.makeEntity(e));
  }

  async findUnique(
    data: ISaleRepositoryFindUniqueData,
  ): Promise<SaleEntity | null> {
    const sale = await this.db.findUnique({
      where: data.where,
    });

    return sale ? this.makeEntity(sale) : null;
  }

  private makeEntity(data: Sale): SaleEntity {
    return new SaleEntity({
      id: data.id,
      qtd: data.qtd,
      created_at: data.created_at,
      payment: new PaymentEntity({
        method: data.payment_method,
        status: data.payment_status,
      }),
      total_price: data.total_price,
      product: {
        id: data.product_id,
      },
      customer: {
        id: data.customer_id,
      },
    });
  }
}
