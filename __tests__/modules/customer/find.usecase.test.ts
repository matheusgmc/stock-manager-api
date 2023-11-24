import { inMemoryCustomerRepository } from "../../implements";
import { CustomerUseCases } from "modules/customer";

describe("Customer - FindById - UseCase", () => {
  const suit = new CustomerUseCases(inMemoryCustomerRepository);

  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.findById).toBeDefined();
  });

  it("should successfully return a Customer", async () => {
    const data = await suit.findById({
      id: "1",
    });

    expect(data).toHaveProperty("id", "1");
    expect(data).toHaveProperty("name", "test_mock_1");
  });

  it("should return null", async () => {
    const data = await suit.findById({
      id: "3",
    });

    expect(data).toBe(null);
  });

  it("should fail if the id is empty", async () => {
    // @ts-ignore
    const data = await suit.findById({});

    expect(data).toHaveProperty("message", "ID_PARAMS_INVALID");
  });
});
