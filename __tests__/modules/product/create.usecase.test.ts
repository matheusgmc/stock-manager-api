import { inMemoryProductRepository } from "../../repository/";
import { CreateProductUseCase } from "../../../src/modules/product/create/";
import { ICreateProductRequestDTO } from "../../../src/modules/product/create/create.dto";
import {
  AlreadyExistsError,
  ParamsInvalidError,
} from "../../../src/modules/errors";
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
    const data = await suit.execute({ ...productMock, name: "" });

    expect(data).toBeInstanceOf(ParamsInvalidError);
    expect(data).toHaveProperty("message", "name or price_unit is invalid");
    expect(data).toHaveProperty("name", "ParamsInvalid");
  });

  it("should fail if create a new product without price", async () => {
    //@ts-ignore
    const data = await suit.execute({ ...productMock, price_unit: "" });

    expect(data).toBeInstanceOf(ParamsInvalidError);
    expect(data).toHaveProperty("message", "name or price_unit is invalid");
    expect(data).toHaveProperty("name", "ParamsInvalid");
  });

  it("should fail if a product with the same name already exists", async () => {
    const data = await suit.execute(productMock);

    expect(data).toBeInstanceOf(AlreadyExistsError);
    expect(data).toHaveProperty("message", "product already exists");
    expect(data).toHaveProperty("name", "AlreadyExists");
  });
});
