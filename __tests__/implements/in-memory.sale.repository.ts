import {
  ISaleRepository,
  ISaleRepositoryCreate,
  ISaleRepositoryFindManyData,
  ISaleRepositoryFindUniqueData,
} from "repositories";
import { SaleData } from "database/entities";

import { randomUUID } from "node:crypto";
import { inMemoryCustomerRepository, inMemoryProductRepository } from ".";

export class InMemorySaleRepository implements ISaleRepository {
  Sales: SaleData[] = [
    {
      created_at: "2023-02-20T00:00:00.000Z",
      id: "1",
      payment_status: "DONE",
      payment_method: "PIX",
      product_name: inMemoryProductRepository.Products[0].name,
      product_price_unit: inMemoryProductRepository.Products[0].price_unit,
      total_price: inMemoryProductRepository.Products[0].price_unit * 4,
      customer_name: inMemoryCustomerRepository.Customers[0].name,
      product_quantity_purchased: 4,
    },

    {
      created_at: "2023-02-23T00:00:00.000Z",
      id: "2",
      payment_status: "PENDING",
      payment_method: "CASH",
      product_name: inMemoryProductRepository.Products[1].name,
      product_price_unit: inMemoryProductRepository.Products[1].price_unit,
      total_price: inMemoryProductRepository.Products[1].price_unit * 4,
      customer_name: inMemoryCustomerRepository.Customers[1].name,
      product_quantity_purchased: 4,
    },
  ];

  async create(data: ISaleRepositoryCreate): Promise<SaleData> {
    const newSale: SaleData = {
      id: randomUUID(),
      product_price_unit: data.product.price_unit,
      product_quantity_purchased: data.product.quantity_purchased,
      customer_name: data.customer.name,
      product_name: data.product.name,
      total_price: data.total_price,
      payment_method: data.payment.method,
      payment_status: data.payment.status,

      created_at: data.created_at,
    };

    this.Sales.push(newSale);

    return new SaleData(newSale);
  }

  async findUnique(
    data: ISaleRepositoryFindUniqueData
  ): Promise<SaleData | null> {
    const sale = this.Sales.find((sale) => data.where.id === sale.id);
    return sale ? new SaleData(sale) : null;
  }

  async findMany(data: ISaleRepositoryFindManyData): Promise<SaleData[]> {
    if (!data.where && !data.between) return this.Sales;
    const sales = [];
    const date_start = Date.parse(data?.between?.date_start);
    const date_end = Date.parse(data?.between?.date_end);
    this.Sales.forEach((sale) => {
      if (
        this.compareObjects(sale, data.where) ||
        this.betweenTwoDates(sale.created_at, date_start, date_end)
      ) {
        sales.push(sale);
      }
    });
    return sales;
  }
  private compareObjects(obj: SaleData, where: any): boolean {
    if (!where) return false;
    return (
      obj.customer_name == where.customer_name ||
      obj.payment_method == where.payment_method ||
      obj.payment_status == where.payment_status ||
      obj.total_price == where.total_price ||
      obj.product_name == where.product_name ||
      obj.product_quantity_purchased == where.quantity_purchased
    );
  }
  private betweenTwoDates(target: string, start: number, end: number): boolean {
    const parse = Date.parse(target);
    if (!end) {
      return parse >= start;
    }

    return parse >= start && parse <= end;
  }
}
