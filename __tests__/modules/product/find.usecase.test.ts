import { ProductUseCases } from "modules/product";
import { inMemoryProductRepository } from "../../implements";

describe("Product - FindById - UseCase", () => {
  const suit = new ProductUseCases(inMemoryProductRepository);

  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.findById).toBeDefined();
  });

  it("should successfully find by id", async () => {
    const data = await suit.findById({
      id: "1",
    });

    expect(data).toHaveProperty("id", "1");
    expect(data).toHaveProperty("name", "test_mock_1");
    expect(data).toHaveProperty("price_unit", 1);
    expect(data).toHaveProperty("amount", 1);
  });

  it("should return null", async () => {
    const data = await suit.findById({
      id: "3",
    });

    expect(data).toBe(null);
  });
});
