import { UpdateProductUseCase } from "../../../src/modules/product";
import { IUpdateProductRequestDTO } from "../../../src/modules/product/update/update.dto";
import { inMemoryProductRepository } from "../../repository";

describe("Product - Update - UseCase", () => {
  const suit = new UpdateProductUseCase(inMemoryProductRepository);
  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.execute).toBeDefined();
  });

  const dtoMock: IUpdateProductRequestDTO = {
    id: "1",
    data: {
      name: "mock_test_1",
      price_unit: 2,
      amount: 10,
    },
  };

  it("should update a product successfully", async () => {
    const data = await suit.execute(dtoMock);

    expect(data).toHaveProperty("id", dtoMock.id);
    expect(data).toHaveProperty("name", dtoMock.data.name);
    expect(data).toHaveProperty("price_unit", dtoMock.data.price_unit);
    expect(data).toHaveProperty("amount", dtoMock.data.amount);
  });

  it("should fail if product not found", async () => {
    await expect(suit.execute({ ...dtoMock, id: "3" })).rejects.toHaveProperty(
      "message",
      "product not found"
    );
  });

  it("should fail if data is empty or undefined", async () => {
    //@ts-ignore
    await expect(suit.execute({ ...dtoMock, data: {} })).rejects.toHaveProperty(
      "message",
      "at least one data is required"
    );

    await expect(
      //@ts-ignore
      suit.execute({ ...dtoMock, data: undefined })
    ).rejects.toHaveProperty("message", "at least one data is required");
  });
});
