import { ProductData } from "database/entities";
import { NotFoundError } from "../../../src/modules/errors";
import { FindProductUseCase } from "../../../src/modules/product/find";
import { inMemoryProductRepository } from "../../implements";

describe("Product - Find - UseCase", () => {
  const suit = new FindProductUseCase(inMemoryProductRepository);

  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.execute).toBeDefined();
  });

  it("should successfully find by id", async () => {
    const data = await suit.execute({
      id: "1",
    });

    expect(data).toHaveProperty("id", "1");
    expect(data).toHaveProperty("name", "test_mock_1");
    expect(data).toHaveProperty("price_unit", 1);
    expect(data).toHaveProperty("amount", 1);
  });

  it("should successfully find by name", async () => {
    const data = await suit.execute({
      name: "test_mock_1",
    });

    expect(data).toHaveProperty("id", "1");
    expect(data).toHaveProperty("name", "test_mock_1");
    expect(data).toHaveProperty("price_unit", 1);
    expect(data).toHaveProperty("amount", 1);
  });

  it("should return all", async () => {
    const data = (await suit.execute({})) as ProductData[];
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(2);

    data.forEach((product) => {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price_unit");
      expect(product).toHaveProperty("amount");
    });
  });

  it("should fail if id not found a product", async () => {
    const data = await suit.execute({
      id: "3",
    });

    expect(data).toBeInstanceOf(NotFoundError);
    expect(data).toHaveProperty("message", "product not found");
    expect(data).toHaveProperty("name", "NotFound");
  });

  it("should fail if name not found a product", async () => {
    const data = await suit.execute({
      name: "test",
    });

    expect(data).toBeInstanceOf(NotFoundError);
    expect(data).toHaveProperty("message", "product not found");
    expect(data).toHaveProperty("name", "NotFound");
  });
});
