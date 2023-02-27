import { SaleEntity } from "entities/sale.entity";
import { FindSaleUseCase } from "modules/sale/find";
import { inMemorySaleRepository } from "../../implements";

describe("Sale - Find - UseCase", () => {
  const suit = new FindSaleUseCase(inMemorySaleRepository);

  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.execute).toBeDefined();
  });

  it("should return all sales", async () => {
    const data = await suit.execute({});

    expect(data).toHaveLength(2);
  });

  it("should successfully return a sale by id", async () => {
    const data = await suit.execute({
      id: "1",
    });
    expect(data).toBeInstanceOf(SaleEntity);
    expect(data).toHaveProperty("payment.method", "PIX");
    expect(data).toHaveProperty("payment.status", "DONE");
    expect(data).toHaveProperty("product.name", "test_mock_1");
    expect(data).toHaveProperty("product.price_unit", 1);
    expect(data).toHaveProperty("product.quantity_purchased", 4);
    expect(data).toHaveProperty("customer.name", "test_mock_1");
    expect(data).toHaveProperty("total_price", 4);
  });

  it("should successfully return all sales by payment method", async () => {
    const data = (await suit.execute({
      payment_method: "PIX",
    })) as SaleEntity[];

    expect(data).toHaveLength(1);
    data.map((sale) => {
      expect(sale).toBeInstanceOf(SaleEntity);
      expect(sale).toHaveProperty("payment.method", "PIX");
    });
  });

  it("should successfully return all sales by payment status", async () => {
    const data = (await suit.execute({
      payment_status: "DONE",
    })) as SaleEntity[];

    expect(data).toHaveLength(1);
    data.map((sale) => {
      expect(sale).toBeInstanceOf(SaleEntity);
      expect(sale).toHaveProperty("payment.status", "DONE");
    });
  });

  it("should successfully return all sales by quantity purchased", async () => {
    const data = (await suit.execute({
      quantity_purchased: 4,
    })) as SaleEntity[];

    expect(data).toHaveLength(2);
    data.map((sale) => {
      expect(sale).toBeInstanceOf(SaleEntity);
      expect(sale).toHaveProperty("product.quantity_purchased", 4);
    });
  });

  it("should successfully return all sales by total price", async () => {
    const data = (await suit.execute({
      total_price: 4,
    })) as SaleEntity[];

    expect(data).toHaveLength(2);
    data.map((sale) => {
      expect(sale).toBeInstanceOf(SaleEntity);
      expect(sale).toHaveProperty("total_price", 4);
    });
  });
});
