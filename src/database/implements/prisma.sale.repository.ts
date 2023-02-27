import { prisma } from "lib/prisma";
import {
  ISaleRepository,
  ISaleRepositoryCreate,
  ISaleRepositoryFindUniqueData,
} from "repositories/sale.repository.interface";
import { SaleData } from "../entities";

export class PrismaSaleRepository implements ISaleRepository {
  database = prisma.sale;
  async create(data: ISaleRepositoryCreate): Promise<SaleData> {
    const newSale = await this.database.create({
      data: {
        created_at: data.created_at,
        total_price: data.total_price,
        product_name: data.product.name,
        customer_name: data.customer.name,
        payment_method: data.payment.method,
        payment_status: data.payment.status,
        product_price_unit: data.product.price_unit,
        product_quantity_purchased: data.product.quantity_purchased,
      },
    });
    return new SaleData(newSale);
  }

  async findUnique(data: ISaleRepositoryFindUniqueData): Promise<SaleData> {
    const sale = await this.database.findUnique({
      where: data.where,
    });
    return new SaleData(sale);
  }
}
