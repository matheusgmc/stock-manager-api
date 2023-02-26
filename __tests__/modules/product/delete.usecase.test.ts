import { DeleteProductUseCase } from "../../../src/modules/product/delete";
import { inMemoryProductRepository } from "../../implements";

describe("Product - Delete - UseCase", () => {
  const suit = new DeleteProductUseCase(inMemoryProductRepository);
  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.execute).toBeDefined();
  });

  it("should delete successfully", async () => {
    const data = await suit.execute({
      id: "2",
    });

    expect(data).toHaveProperty("id", "2");
    expect(data).toHaveProperty("name", "test_mock_2");
    expect(data).toHaveProperty("price_unit", 1);
    expect(data).toHaveProperty("amount", 1);
  });

  it("should fail if product not found", async () => {
    await expect(
      suit.execute({
        id: "2",
      })
    ).rejects.toHaveProperty("message", "product not found");
  });

  it("should fail if id is empty", async () => {
    await expect(
      suit.execute({
        id: "",
      })
    ).rejects.toHaveProperty("message", "id isn't valid");
  });
});
