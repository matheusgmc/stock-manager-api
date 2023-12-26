import { OrderEntity } from "entities/order.entity";
import { ProductEntity } from "entities/product.entity";
import { OrderUseCases } from "modules/order/order.usecases";
import {
  inMemoryOrderRepository,
  inMemoryProductRepository,
} from "../../implements";

describe("Unit - Order UseCase", () => {
  const suit = new OrderUseCases(
    inMemoryOrderRepository,
    inMemoryProductRepository,
  );

  const product = ProductEntity.create({
    name: "Product",
    amount: 4,
    unit_price: 10,
  }) as ProductEntity;

  const product_two = ProductEntity.build({
    name: "Product Two",
    amount: 4,
    //@ts-ignore
    unit_price: "a",
    updated_at: new Date(),
    created_at: new Date(),
  }) as ProductEntity;

  beforeAll(async () => {
    inMemoryProductRepository.create(product);
    inMemoryProductRepository.create(product_two);
  });

  it("should successfully return a order", async () => {
    const data = await suit.create({
      qtd: 1,
      product_id: product.id,
    });

    expect(data).toBeInstanceOf(OrderEntity);
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("total_price", 10);
    await expect(
      inMemoryProductRepository.findUnique({ where: { id: product.id } }),
    ).resolves.toHaveProperty("amount", 3);
  });

  it("should fail if qtd is greater than amount", async () => {
    await expect(
      suit.create({
        qtd: 4,
        product_id: product.id,
      }),
    ).resolves.toHaveProperty("message", "ERR_PRODUCT_AMOUNT_IS_NOT_ENOUGH");
  });

  it("should fail if qtd is invalid", async () => {
    await expect(
      suit.create({
        //@ts-ignore
        qtd: "a",
        product_id: product.id,
      }),
    ).resolves.toHaveProperty("message", "QTD_PARAMS_INVALID");
  });

  it("should fail if total_price is invalid", async () => {
    await expect(
      suit.create({
        qtd: 2,
        product_id: product_two.id,
      }),
    ).resolves.toHaveProperty("message", "ERR_TOTAL_PRICE_IS_INVALID");
  });
});
