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
      created_at: new Date().toLocaleString(),
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
      created_at: new Date().toLocaleString(),
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
    if (!data.where) return this.Sales;
    const sales = [];
    this.Sales.forEach((sale) => {
      if (
        sale.payment_method == data.where.payment.method ||
        sale.payment_status == data.where.payment.status ||
        sale.product_name == data.where.product.name ||
        sale.customer_name == data.where.customer.name ||
        sale.total_price == data.where.total_price
      ) {
        sales.push(sale);
      }
    });
    return sales;
  }
}
