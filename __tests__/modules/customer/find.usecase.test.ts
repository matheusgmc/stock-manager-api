import { CustomerEntity } from "../../../src/entities";
import { FindCustomerUseCase } from "../../../src/modules/customer";
import { inMemoryCustomerRepository } from "../../repository";

describe("Customer - Find - UseCase", () => {
  const suit = new FindCustomerUseCase(inMemoryCustomerRepository);
  it("should be defined", () => {
    expect(suit).toBeDefined();
    expect(suit.execute).toBeDefined();
  });

  it("should successfully find by id", async () => {
    const data = await suit.execute({
      id: "1",
    });

    expect(data).toHaveProperty("id", "1");
    expect(data).toHaveProperty("name", "test_mock_1");
  });

  it("should successfully find by name", async () => {
    const data = await suit.execute({
      name: "test_mock_1",
    });

    expect(data).toHaveProperty("id", "1");
    expect(data).toHaveProperty("name", "test_mock_1");
  });

  it("should return all", async () => {
    const data = (await suit.execute({})) as CustomerEntity[];
    expect(data).toHaveLength(2);
    data.forEach((customer) => {
      expect(customer).toBeInstanceOf(CustomerEntity);
    });
  });
});
