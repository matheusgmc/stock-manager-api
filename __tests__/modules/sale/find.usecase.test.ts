import { FindSaleUseCase } from "modules/sale/find";
import { inMemorySaleRepository } from "../../implements";

describe("Sale - Find - UseCase", () => {
  const suit = new FindSaleUseCase(inMemorySaleRepository);

  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.execute).toBeDefined();
  });

  it("should return all sales", async () => {
    const data = await suit.execute({});

    expect(data).toHaveLength(2);
  });
});
