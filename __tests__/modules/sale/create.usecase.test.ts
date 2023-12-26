import crypto from "node:crypto";
import {
  CustomerEntity,
  OrderEntity,
  ProductEntity,
  SaleEntity,
} from "entities";
import { ISaleCreateRequestDTO } from "modules/sale/sale.dto";
import { SaleUseCases } from "modules/sale/sale.usecases";

import {
  inMemoryCustomerRepository,
  inMemoryOrderRepository,
  inMemoryProductRepository,
  inMemorySaleRepository,
} from "../../implements";

describe("Sale - Create - UseCase", () => {
  const suit = new SaleUseCases(
    inMemorySaleRepository,
    inMemoryCustomerRepository,
    inMemoryOrderRepository,
  );

  const customer_id = crypto.randomUUID();
  const product = ProductEntity.build({
    name: "Product",
    unit_price: 10,
    amount: 4,
    id: crypto.randomUUID(),
    created_at: new Date(),
    updated_at: new Date(),
  });

  const sale = OrderEntity.create({
    qtd: 4,
    product,
  }) as OrderEntity;

  beforeAll(() => {
    inMemoryProductRepository.create(product);

    inMemoryOrderRepository.create(sale);

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
    order_ids: [sale.id],
    customer_id,
    payment_method: "PIX",
    payment_status: "DONE",
  };

  it("should create a new sale successfully", async () => {
    const data = await suit.create(dto);

    expect(data).toBeInstanceOf(SaleEntity);
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("payment.status", "DONE");
    expect(data).toHaveProperty("payment.method", "PIX");
    expect(data).toHaveProperty("customer.id", customer_id);
    expect(data).toHaveProperty("total_price", 40);
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

  it("should fail if customer_id is empty", async () => {
    await expect(
      suit.create({ ...dto, customer_id: "" }),
    ).resolves.toHaveProperty("message", "CUSTOMER_ID_IS_REQUIRED");
  });

  it("should fail if customer not found", async () => {
    await expect(
      suit.create({ ...dto, customer_id: "3" }),
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
