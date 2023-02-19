import { inMemoryProductRepository } from "../../repository/";
import { CreateProductUseCase } from "../../../src/modules/product/create/";
import { ICreateProductRequestDTO } from "../../../src/modules/product/create/create.dto";
describe("Product - Create - UseCase", () => {
  const suit = new CreateProductUseCase(inMemoryProductRepository);

  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.execute).toBeDefined();
  });

  const productMock: ICreateProductRequestDTO = {
    name: "test",
    price_unit: 1,
    amount: 0,
  };

  it("should successfully create a new product", async () => {
    const data = await suit.execute(productMock);
    expect(data).not.toBeUndefined();

    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name", productMock.name);
    expect(data).toHaveProperty("price_unit", productMock.price_unit);
    expect(data).toHaveProperty("amount", productMock.amount);
  });

  it("should fail if create a product without name", async () => {
    await expect(
      suit.execute({ ...productMock, name: "" })
    ).rejects.toHaveProperty("message", "params isn't valid");
  });

  it("should fail if create a new product without price", async () => {
    await expect(
      //@ts-ignore
      suit.execute({ ...productMock, price_unit: "" })
    ).rejects.toHaveProperty("message", "params isn't valid");
  });

  it("should fail if a product with the same name already exists", async () => {
    await expect(suit.execute(productMock)).rejects.toHaveProperty(
      "message",
      "product already exists"
    );
  });
});
