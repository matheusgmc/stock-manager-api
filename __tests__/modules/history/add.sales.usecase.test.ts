import { SaleEntity } from "entities";
import {
  AddSalesHistoryUseCase,
  IAddSalesHistoryRequestDTO,
} from "../../../src/modules/history/add-sales";

import {
  inMemoryHistoryRepository,
  inMemorySaleRepository,
} from "../../implements";

describe("History - Add Sales - UseCase", () => {
  const suit = new AddSalesHistoryUseCase(
    inMemoryHistoryRepository,
    inMemorySaleRepository
  );
  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.execute).toBeDefined();
  });

  const dtoMock: IAddSalesHistoryRequestDTO = {
    sale_id: "1",
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
    await expect(suit.execute({ sale_id: {} })).rejects.toHaveProperty(
      "message",
      "sale_id isn't valid"
    );

    //@ts-ignore
    await expect(suit.execute({ sale_id: "" })).rejects.toHaveProperty(
      "message",
      "sale_id isn't valid"
    );

    //@ts-ignore
    await expect(suit.execute({ sale_id: null })).rejects.toHaveProperty(
      "message",
      "sale_id isn't valid"
    );
  });
});
