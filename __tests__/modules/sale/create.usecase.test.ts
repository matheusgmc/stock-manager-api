import { SaleEntity } from "entities";
import {
  CreateSaleUseCase,
  ICreateSaleRequestDTO,
} from "../../../src/modules/sale/create";

import {
  inMemoryCustomerRepository,
  inMemoryProductRepository,
  inMemorySaleRepository,
} from "../../implements";

describe("Sale - Create - UseCase", () => {
  const suit = new CreateSaleUseCase(
    inMemorySaleRepository,
    inMemoryProductRepository,
    inMemoryCustomerRepository
  );
  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.execute).toBeDefined();
  });

  const saleMock: ICreateSaleRequestDTO = {
    product_id: "1",
    customer_id: "1",
    payment_method: "PIX",
    payment_status: "DONE",
    quantity_purchased: 4,
  };
  it("should create a new sale successfully", async () => {
    const data = await suit.execute(saleMock);

    expect(data).toBeInstanceOf(SaleEntity);
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("payment.status", "DONE");
    expect(data).toHaveProperty("payment.method", "PIX");

    expect(data).toHaveProperty(
      "total_price",
      saleMock.quantity_purchased *
        inMemoryProductRepository.Products[0].price_unit
    );

    expect(data).toHaveProperty(
      "product.price_unit",
      inMemoryProductRepository.Products[0].price_unit
    );
    expect(data).toHaveProperty("product.quantity_purchased", 4);
    expect(data).toHaveProperty(
      "product.name",
      inMemoryProductRepository.Products[0].name
    );
    expect(data).toHaveProperty(
      "customer.name",
      inMemoryCustomerRepository.Customers[0].name
    );
  });

  it("should fail if dto is empty", async () => {
    //@ts-ignore
    await expect(suit.execute({})).rejects.toHaveProperty(
      "message",
      "dto must not be empty"
    );
  });

  it("should fail if product_id or customer_id is empty", async () => {
    await expect(
      suit.execute({ ...saleMock, product_id: "", customer_id: "1" })
    ).rejects.toHaveProperty("message", "dto isn't valid");

    await expect(
      suit.execute({ ...saleMock, product_id: "1", customer_id: "" })
    ).rejects.toHaveProperty("message", "dto isn't valid");
  });

  it("should fail if product or customer not found", async () => {
    await expect(
      suit.execute({ ...saleMock, product_id: "3", customer_id: "1" })
    ).rejects.toHaveProperty("message", "product not found");

    await expect(
      suit.execute({ ...saleMock, product_id: "1", customer_id: "3" })
    ).rejects.toHaveProperty("message", "customer not found");
  });

  it("shoulf fail if payment method is invalid", async () => {
    await expect(
      suit.execute({ ...saleMock, payment_method: "" })
    ).rejects.toHaveProperty("message", "payment method is invalid");

    await expect(
      suit.execute({ ...saleMock, payment_method: "test" })
    ).rejects.toHaveProperty("message", "payment method is invalid");
  });

  it("shoulf fail if payment status is invalid", async () => {
    await expect(
      suit.execute({ ...saleMock, payment_status: "" })
    ).rejects.toHaveProperty("message", "payment status is invalid");

    await expect(
      suit.execute({ ...saleMock, payment_status: "test" })
    ).rejects.toHaveProperty("message", "payment status is invalid");
  });
});
