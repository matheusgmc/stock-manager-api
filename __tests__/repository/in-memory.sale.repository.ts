import { randomUUID } from "node:crypto";
import { inMemoryCustomerRepository, inMemoryProductRepository } from ".";
import { SaleData } from "../../src/database/entities";
import {
  ISaleRepository,
  ISaleRepositoryCreate,
} from "../../src/implements/sale.repository.interface";

export class InMemorySaleRepository implements ISaleRepository {
  Sales: SaleData[] = [
    {
      created_at: new Date().toLocaleString(),
      id: "1",
      payment_status: "DONE",
      payment_method: "PIX",
      product: inMemoryProductRepository.Products[0],
      customer: inMemoryCustomerRepository.Customers[0],
    },

    {
      created_at: new Date().toLocaleString(),
      id: "2",
      payment_status: "PENDING",
      payment_method: "CASH",
      product: inMemoryProductRepository.Products[1],
      customer: inMemoryCustomerRepository.Customers[1],
    },
  ];

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
