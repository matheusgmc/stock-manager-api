import crypto from "node:crypto";
import { SaleEntity } from "entities/sale.entity";
import { SaleUseCases } from "modules/sale";
import {
  inMemoryCustomerRepository,
  inMemoryOrderRepository,
  inMemoryProductRepository,
  inMemorySaleRepository,
} from "../../implements";

import { ProductEntity } from "entities/product.entity";
import { CustomerEntity } from "entities/customer.entity";
import { OrderEntity } from "entities/order.entity";

describe("Sale - Find - UseCase", () => {
  const suit = new SaleUseCases(
    inMemorySaleRepository,
    inMemoryCustomerRepository,
    inMemoryOrderRepository,
  );

  const product_ids = [crypto.randomUUID(), crypto.randomUUID()];
  const customer_ids = [crypto.randomUUID(), crypto.randomUUID()];
  const sale_id = crypto.randomUUID();

  beforeAll(() => {
    const products = product_ids.map((e, i) => {
      const product = ProductEntity.build({
        id: e,
        name: `Product ${i}`,
        unit_price: 10,
        amount: 100,
      });
      inMemoryProductRepository.create(product);
      return product;
    });

    const customers = customer_ids.map((e, i) => {
      const customer = CustomerEntity.create({
        id: e,
        name: `Customer ${i}`,
      });
      inMemoryCustomerRepository.create(customer);
      return customer;
    });

    const orders = products.map((e) =>
      OrderEntity.create({
        qtd: 1,
        product: e,
      }),
    ) as OrderEntity[];

    inMemorySaleRepository.create(
      SaleEntity.build({
        id: sale_id,
        customer: customers[0],
        payment: {
          method: "PIX",
          status: "DONE",
        },
        total_price: 4 * products[0].unit_price,
        created_at: new Date(),
        orders: [orders[0]],
      }),
    );
    [
      SaleEntity.create({
        orders: [orders[0]],
        customer: customers[0],
        payment: { method: "PIX", status: "DONE" },
      }),
      SaleEntity.create({
        orders: [orders[1]],
        customer: customers[1],
        payment: { method: "PIX", status: "DONE" },
      }),
      SaleEntity.create({
        orders: [orders[1]],
        customer: customers[1],
        payment: { method: "CASH", status: "PENDING" },
      }),
    ].map((e) => inMemorySaleRepository.create(e as SaleEntity));
  });

  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.findById).toBeDefined();
  });

  it("should successfully return a sale by id", async () => {
    const data = await suit.findById({
      id: sale_id,
    });
    expect(data).toBeInstanceOf(SaleEntity);
    expect(data).toHaveProperty("id", sale_id);
    expect(data).toHaveProperty("payment.method", "PIX");
    expect(data).toHaveProperty("payment.status", "DONE");
    expect(data).toHaveProperty("customer.id", customer_ids[0]);
    expect(data).toHaveProperty("total_price", 40);
  });

  it("should successfully return all sales by customer id", async () => {
    const data = (await suit.findByCustomerId({
      customer_id: customer_ids[0],
    })) as SaleEntity[];

    expect(data).toHaveLength(2);
    data.map((sale) => {
      expect(sale).toBeInstanceOf(SaleEntity);
      expect(sale).toHaveProperty("customer.id", customer_ids[0]);
    });
  });

  it("should successfully return all sales by payment method", async () => {
    const data = (await suit.findByPayment({
      method: "PIX",
    })) as SaleEntity[];

    expect(data).toHaveLength(3);
    data.map((sale) => {
      expect(sale).toBeInstanceOf(SaleEntity);
      expect(sale).toHaveProperty("payment.method", "PIX");
    });
  });

  it("should successfully return all sales by payment method", async () => {
    const data = (await suit.findByPayment({
      method: "CASH",
    })) as SaleEntity[];

    expect(data).toHaveLength(1);
    data.map((sale) => {
      expect(sale).toBeInstanceOf(SaleEntity);
      expect(sale).toHaveProperty("payment.method", "CASH");
    });
  });

  it("should successfully return all sales by payment status", async () => {
    const data = (await suit.findByPayment({
      status: "DONE",
    })) as SaleEntity[];

    expect(data).toHaveLength(3);
    data.map((sale) => {
      expect(sale).toBeInstanceOf(SaleEntity);
      expect(sale).toHaveProperty("payment.status", "DONE");
    });
  });

  it("should successfully return all sales by payment status", async () => {
    const data = (await suit.findByPayment({
      status: "PENDING",
    })) as SaleEntity[];

    expect(data).toHaveLength(1);
    data.map((sale) => {
      expect(sale).toBeInstanceOf(SaleEntity);
      expect(sale).toHaveProperty("payment.status", "PENDING");
    });
  });
});
