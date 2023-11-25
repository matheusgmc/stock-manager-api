import {
  ISaleRepository,
  ISaleRepositoryFindManyData,
  ISaleRepositoryFindUniqueData,
} from "repositories";

import { SaleEntity } from "entities/sale.entity";

export class InMemorySaleRepository implements ISaleRepository {
  private Sales: SaleEntity[] = [];

  async create(data: SaleEntity): Promise<void> {
    this.Sales.push(data);

    return Promise.resolve();
  }

  async findUnique(
    data: ISaleRepositoryFindUniqueData,
  ): Promise<SaleEntity | null> {
    const sale = this.Sales.find((sale) => data.where.id === sale.id);
    return sale || null;
  }

  async findMany(data: ISaleRepositoryFindManyData): Promise<SaleEntity[]> {
    const { product_id, payment_status, payment_method, customer_id } =
      data.where;

    return this.Sales.filter(
      ({ payment, product, customer }) =>
        product.id === product_id ||
        customer.id === customer_id ||
        payment.status === payment_status ||
        payment.method === payment_method,
    );
  }
}
