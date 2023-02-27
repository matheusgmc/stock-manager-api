import { SaleEntity } from "entities/sale.entity";
import { ParamsInvalidError, ParamsRequiredError } from "modules/errors";
import { HistorySalesUseCase } from "modules/sale/history";
import { inMemorySaleRepository } from "../../implements";

describe("Sales - History - UseCase", () => {
  const suit = new HistorySalesUseCase(inMemorySaleRepository);
  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.execute).toBeDefined();
  });

  it("should fail if dto is empty", async () => {
    //@ts-ignore
    const data = await suit.execute({});
    expect(data).toBeInstanceOf(ParamsRequiredError);
    expect(data).toHaveProperty("message", "date is required");
  });

  it("should fail if date_start is empty", async () => {
    //@ts-ignore
    const data = await suit.execute({ date_start: "" });
    expect(data).toBeInstanceOf(ParamsRequiredError);
    expect(data).toHaveProperty("message", "date_start is required");
  });

  it("should fail if date_start is invalid", async () => {
    //@ts-ignore
    const data = await suit.execute({ date_start: "test" });
    expect(data).toBeInstanceOf(ParamsInvalidError);
    expect(data).toHaveProperty("message", "date_start must be a date valid");
  });

  it("should fail if date_end is invalid", async () => {
    const data = await suit.execute({
      date_start: "2023-02-17",
      date_end: "test",
    });
    expect(data).toBeInstanceOf(ParamsInvalidError);
    expect(data).toHaveProperty("message", "date_end must be a date valid");
  });

  it("should successfully get the history", async () => {
    const data = (await suit.execute({
      date_start: "2023-02-20T00:00:00.000Z",
    })) as SaleEntity[];
    expect(data).toHaveLength(2);
    data.map((item) => {
      expect(item).toBeInstanceOf(SaleEntity);
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
