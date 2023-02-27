import { SaleEntity } from "entities";
import {
  SalesHistoryUseCase,
  ISalesHistoryRequestDTO,
} from "../../../src/modules/history/add-sales";

import {
  inMemoryHistoryRepository,
  inMemorySaleRepository,
} from "../../implements";

describe("History - Add Sales - UseCase", () => {
  const suit = new SalesHistoryUseCase(inMemoryHistoryRepository);
  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.execute).toBeDefined();
  });

  const dtoMock: ISalesHistoryRequestDTO = {
    sale: SaleEntity.create(inMemorySaleRepository.Sales[0]),
  };

  it("should create a new history successfully", async () => {
    await expect(suit.execute(dtoMock)).resolves.not.toThrow();
  });

  it("should fail if a sale is empty", async () => {
    //@ts-ignore
    await expect(suit.execute({})).rejects.toHaveProperty(
      "message",
      "dto isn't empty"
    );
  });

  it("should fail if a sale is empty or invalid", async () => {
    //@ts-ignore
    await expect(suit.execute({ sale: {} })).rejects.toHaveProperty(
      "message",
      "sale isn't valid"
    );

    //@ts-ignore
    await expect(suit.execute({ sale: "" })).rejects.toHaveProperty(
      "message",
      "sale isn't valid"
    );

    //@ts-ignore
    await expect(suit.execute({ sale: null })).rejects.toHaveProperty(
      "message",
      "sale isn't valid"
    );
  });
});
