import { ProductEntity } from "entities/product.entity";
import { UtilsDate } from "utils/date";
import {
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

    expect(data).toBeInstanceOf(ProductEntity);
    expect(data).toHaveProperty("id", dtoMock.id);
    expect(data).toHaveProperty("name", dtoMock.data.name);
    expect(data).toHaveProperty("price_unit", dtoMock.data.price_unit);
    expect(data).toHaveProperty("amount", dtoMock.data.amount);
    expect(data).toHaveProperty("amount", dtoMock.data.amount);
    expect(data).toHaveProperty("updated_at", UtilsDate.getTodayWithoutHours());
  });
  it("should fail if no fields have been changed", async () => {
    //@ts-ignore
    const data = await suit.execute({ ...dtoMock, data: { test: "" } });
    expect(data).toBeInstanceOf(ParamsInvalidError);
    expect(data).toHaveProperty("message", "data isn't valid");
    expect(data).toHaveProperty("name", "ParamsInvalid");
  });

  it("should fail if product not found", async () => {
    const data = await suit.execute({ ...dtoMock, id: "3" });

    expect(data).toBeInstanceOf(NotFoundError);
    expect(data).toHaveProperty("message", "product not found");
    expect(data).toHaveProperty("name", "NotFound");
  });

  it("should fail if id is empty", async () => {
    //@ts-ignore
    const data = await suit.execute({ id: "", data: {} });
    expect(data).toBeInstanceOf(ParamsRequiredError);
    expect(data).toHaveProperty("message", "id is required");
    expect(data).toHaveProperty("name", "ParamsRequired");
  });

  it("should fail if data is empty", async () => {
    //@ts-ignore
    const data = await suit.execute({ ...dtoMock, data: {} });
    expect(data).toBeInstanceOf(ParamsRequiredError);
    expect(data).toHaveProperty("message", "at least one data is required");
    expect(data).toHaveProperty("name", "ParamsRequired");
  });

  it("should fail if data is undefined", async () => {
    //@ts-ignore
    const data = await suit.execute({ ...dtoMock, data: undefined });
    expect(data).toBeInstanceOf(ParamsRequiredError);
    expect(data).toHaveProperty("message", "at least one data is required");
    expect(data).toHaveProperty("name", "ParamsRequired");
  });
});
