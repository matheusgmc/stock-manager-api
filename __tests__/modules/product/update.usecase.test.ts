import { ProductEntity } from "entities/product.entity";
import { IProductUpdateRequestDTO, ProductUseCases } from "modules/product";
import { UtilsDate } from "utils/date";
import {
  DtoIsEmptyError,
  NotFoundError,
  ParamsInvalidError,
  ParamsRequiredError,
} from "../../../src/modules/errors";
import {
  UpdateProductUseCase,
  IUpdateProductRequestDTO,
} from "../../../src/modules/product/update";

import { inMemoryProductRepository } from "../../implements";

describe("Product - Update - UseCase", () => {
  const suit = new ProductUseCases(inMemoryProductRepository);
  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.update).toBeDefined();
  });

  const dtoMock: IProductUpdateRequestDTO = {
    id: "1",
    data: {
      name: "mock_test_1",
      price_unit: 2,
      amount: 10,
    },
  };

  it("should update a product successfully", async () => {
    const data = await suit.update(dtoMock);

    expect(data).toBeInstanceOf(ProductEntity);
    expect(data).toHaveProperty("id", dtoMock.id);
    expect(data).toHaveProperty("name", dtoMock.data.name);
    expect(data).toHaveProperty("price_unit", dtoMock.data.price_unit);
    expect(data).toHaveProperty("amount", 10);
  });

  it("should fail if product not found", async () => {
    const data = await suit.update({ ...dtoMock, id: "3" });

    expect(data).toBeInstanceOf(NotFoundError);
    expect(data).toHaveProperty("message", "PRODUCT_NOT_FOUND");
    expect(data).toHaveProperty("name", "NotFound");
  });

  it("should fail if id is empty", async () => {
    //@ts-ignore
    const data = await suit.update({ id: "", data: {} });
    expect(data).toBeInstanceOf(ParamsRequiredError);
    expect(data).toHaveProperty("message", "ID_IS_REQUIRED");
    expect(data).toHaveProperty("name", "ParamsRequired");
  });

  it("should fail if data is empty", async () => {
    //@ts-ignore
    const data = await suit.update({ ...dtoMock, data: {} });
    expect(data).toBeInstanceOf(DtoIsEmptyError);
    expect(data).toHaveProperty("message", "DATA_DTO_IS_EMPTY");
    expect(data).toHaveProperty("name", "DtoIsEmpty");
  });

  it("should fail if data is undefined", async () => {
    //@ts-ignore
    const data = await suit.update({ ...dtoMock, data: undefined });
    expect(data).toBeInstanceOf(DtoIsEmptyError);
    expect(data).toHaveProperty("message", "DATA_DTO_IS_EMPTY");
    expect(data).toHaveProperty("name", "DtoIsEmpty");
  });
});
