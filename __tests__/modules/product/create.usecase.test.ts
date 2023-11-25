import { inMemoryProductRepository } from "../../implements";
import {
  CreateProductUseCase,
  ICreateProductRequestDTO,
} from "../../../src/modules/product/create/";

import {
  AlreadyExistsError,
  ParamsInvalidError,
} from "../../../src/modules/errors";
import { IProductCreateRequestDTO, ProductUseCases } from "modules/product";

describe("Product - Create - UseCase", () => {
  const suit = new ProductUseCases(inMemoryProductRepository);

  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.create).toBeDefined();
  });

  const dto: IProductCreateRequestDTO = {
    name: "test_1",
    price_unit: 1,
  };

  it("should successfully create a new product with amount", async () => {
    const data = await suit.create({
      ...dto,
      amount: 10,
    });
    expect(data).not.toBeUndefined();

    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name", dto.name);
    expect(data).toHaveProperty("price_unit", dto.price_unit);
    expect(data).toHaveProperty("amount", 10);
  });

  it("should successfully create a new product without amount", async () => {
    const data = await suit.create({
      ...dto,
      name: "test_2",
    });
    expect(data).not.toBeUndefined();

    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name", "test_2");
    expect(data).toHaveProperty("price_unit", dto.price_unit);
    expect(data).toHaveProperty("amount", 0);
  });

  it("should fail if create a product without name", async () => {
    const data = await suit.create({ ...dto, name: "" });

    expect(data).toBeInstanceOf(ParamsInvalidError);
    expect(data).toHaveProperty("message", "NAME_PARAMS_INVALID");
    expect(data).toHaveProperty("name", "ParamsInvalid");
  });

  it("should fail if create a new product without price", async () => {
    //@ts-ignore
    const data = await suit.create({ ...dto, price_unit: "" });

    expect(data).toBeInstanceOf(ParamsInvalidError);
    expect(data).toHaveProperty("message", "PRICE_UNIT_PARAMS_INVALID");
    expect(data).toHaveProperty("name", "ParamsInvalid");
  });

  it("should fail if a product with the same name already exists", async () => {
    const data = await suit.create(dto);

    expect(data).toBeInstanceOf(AlreadyExistsError);
    expect(data).toHaveProperty("message", "PRODUCT_ALREADY_EXISTS");
    expect(data).toHaveProperty("name", "AlreadyExists");
  });
});
