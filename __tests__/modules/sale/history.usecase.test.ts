import { SaleEntity } from "entities/sale.entity";
import { HistorySalesUseCase } from "modules/sale/history";
import { inMemorySaleRepository } from "../../implements";

describe("Sales - History - UseCase", () => {
  const suit = new HistorySalesUseCase(inMemorySaleRepository);
  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.execute).toBeDefined();
  });

  it("should successfully get the history", async () => {
    const data = (await suit.execute({
      date_start: "2023-02-20T00:00:00.000Z",
    })) as SaleEntity[];
    expect(data).toHaveLength(1);
    data.map((item) => {
      expect(item).toBeInstanceOf(SaleEntity);
      expect(item).toHaveProperty("id", "1");
    });
  });

  it("should successfully get the history between two same dates", async () => {
    const data = (await suit.execute({
      date_start: "2023-02-20T00:00:00.000Z",
      date_end: "2023-02-20T00:00:00.000Z",
    })) as SaleEntity[];
    expect(data).toHaveLength(1);
    data.map((item) => {
      expect(item).toBeInstanceOf(SaleEntity);
      expect(item).toHaveProperty("id", "1");
    });
  });

  it("should successfully get the history between two different dates", async () => {
    const data = (await suit.execute({
      date_start: "2023-02-20T00:00:00.000Z",
      date_end: "2023-02-23T00:00:00.000Z",
    })) as SaleEntity[];
    expect(data).toHaveLength(2);
  });
});
