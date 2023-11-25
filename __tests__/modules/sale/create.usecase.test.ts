import crypto from "node:crypto";
import { CustomerEntity, ProductEntity, SaleEntity } from "entities";
import { ISaleCreateRequestDTO } from "modules/sale/sale.dto";
import { SaleUseCases } from "modules/sale/sale.usecases";

import {
  inMemoryCustomerRepository,
  inMemoryProductRepository,
  inMemorySaleRepository,
} from "../../implements";

describe("Sale - Create - UseCase", () => {
  const suit = new SaleUseCases(
    inMemorySaleRepository,
    inMemoryProductRepository,
    inMemoryCustomerRepository,
  );

  const product_id = crypto.randomUUID();

  const customer_id = crypto.randomUUID();

  beforeAll(() => {
    inMemoryProductRepository.create(
      ProductEntity.create({
        name: "Product",
        unit_price: 10,
        amount: 4,
        id: product_id,
      }),
    );

    inMemoryCustomerRepository.create(
      CustomerEntity.create({
        name: "Customer",
        id: customer_id,
      }),
    );
  });

  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.create).toBeDefined();
  });

  const dto: ISaleCreateRequestDTO = {
    product_id,
    customer_id,
    payment_method: "PIX",
    payment_status: "DONE",
    qtd: 4,
  };
  it("should create a new sale successfully", async () => {
    const data = await suit.create(dto);

    expect(data).toBeInstanceOf(SaleEntity);
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("payment.status", "DONE");
    expect(data).toHaveProperty("payment.method", "PIX");
    expect(data).toHaveProperty("product.id", product_id);
    expect(data).toHaveProperty("customer.id", customer_id);
    expect(data).toHaveProperty("product.unit_price", 10);
    expect(data).toHaveProperty("product.amount", 0);
    expect(data).toHaveProperty("total_price", dto.qtd * 10);
  });

  it("should fail if the qtd is larger the product amount", async () => {
    const data = await suit.create(dto);
    expect(data).toBeInstanceOf(Error);
    expect(data).toHaveProperty("message", "ERR_PRODUCT_AMOUNT_IS_NOT_ENOUGH");
  });

  it("should fail if dto is empty", async () => {
    //@ts-ignore
    await expect(suit.create({})).resolves.toHaveProperty(
      "message",
      "DATA_DTO_IS_EMPTY",
    );

    //@ts-ignore
    await expect(suit.create(undefined)).resolves.toHaveProperty(
      "message",
      "DATA_DTO_IS_EMPTY",
    );
  });

  it("should fail if product_id or customer_id is empty", async () => {
    await expect(
      suit.create({ ...dto, product_id: "", customer_id: "1" }),
    ).resolves.toHaveProperty("message", "PRODUCT_ID_IS_REQUIRED");

    await expect(
      suit.create({ ...dto, product_id: "1", customer_id: "" }),
    ).resolves.toHaveProperty("message", "CUSTOMER_ID_IS_REQUIRED");
  });

  it("should fail if product or customer not found", async () => {
    await expect(
      suit.create({ ...dto, product_id: "3", customer_id: "1" }),
    ).resolves.toHaveProperty("message", "PRODUCT_NOT_FOUND");

    await expect(
      suit.create({ ...dto, product_id: "1", customer_id: "3" }),
    ).resolves.toHaveProperty("message", "CUSTOMER_NOT_FOUND");
  });

  it("shoulf fail if payment method is invalid", async () => {
    await expect(
      // @ts-ignore
      suit.create({ ...dto, payment_method: "" }),
    ).resolves.toHaveProperty("message", "PAYMENT_METHOD_IS_INVALID");

    await expect(
      // @ts-ignore
      suit.create({ ...dto, payment_method: "test" }),
    ).resolves.toHaveProperty("message", "PAYMENT_METHOD_IS_INVALID");
  });

  it("shoulf fail if payment status is invalid", async () => {
    await expect(
      // @ts-ignore
      suit.create({ ...dto, payment_status: "" }),
    ).resolves.toHaveProperty("message", "PAYMENT_STATUS_IS_INVALID");

    await expect(
      // @ts-ignore
      suit.create({ ...dto, payment_status: "test" }),
    ).resolves.toHaveProperty("message", "PAYMENT_STATUS_IS_INVALID");
  });
});
