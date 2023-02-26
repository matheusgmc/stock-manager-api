import { HistoryEntity } from "entities";
import { FindHistoryUseCase } from "../../../src/modules/history/find";
import { inMemoryHistoryRepository } from "../../implements";

describe("History - Find - UseCase", () => {
  const suit = new FindHistoryUseCase(inMemoryHistoryRepository);

  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.execute).toBeDefined();
  });

  it("should find by id without sales successfully", async () => {
    const data = await suit.execute({
      id: "1",
    });

    expect(data).toBeInstanceOf(HistoryEntity);
    expect(data).toHaveProperty("sales.length", 0);
    expect(data).toHaveProperty("created_at", "22/02/2023");
    expect(data).toHaveProperty("updated_at", "22/02/2023 16:55:55");
  });

  it("should find 'today' with sales successfully", async () => {
    const data = await suit.execute({
      today: "23/02/2023",
    });

    expect(data).toBeInstanceOf(HistoryEntity);
    expect(data).toHaveProperty("sales.length", 1);
    expect(data).toHaveProperty("created_at", "23/02/2023");
    expect(data).toHaveProperty("updated_at", "24/02/2023 13:40:40");
  });
});
