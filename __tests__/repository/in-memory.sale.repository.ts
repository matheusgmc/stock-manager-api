import { randomUUID } from "node:crypto";
import { SaleData } from "../../src/database/entities";
import {
  ISaleRepository,
  ISaleRepositoryCreate,
} from "../../src/implements/sale.repository.interface";

export class InMemorySaleRepository implements ISaleRepository {
  Sales: SaleData[] = [];
  async create(data: ISaleRepositoryCreate): Promise<SaleData> {
    const newSale: SaleData = {
      id: randomUUID(),
      product: data.product,
      customer: data.customer,

      payment_method: data.payment.method,
      payment_status: data.payment.status,

      created_at: data.created_at,
    };

    this.Sales.push(newSale);

    return new SaleData(newSale);
  }
}
