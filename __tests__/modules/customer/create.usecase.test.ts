import {
  CreateCustomerUseCase,
  ICreateCustomerRequestDTO,
} from "../../../src/modules/customer/create";
import { inMemoryCustomerRepository } from "../../implements";

describe("Customer - Create - UseCase", () => {
  const suit = new CreateCustomerUseCase(inMemoryCustomerRepository);
  const customerMock: ICreateCustomerRequestDTO = {
    name: "test",
  };

  it("should be defined", async () => {
    expect(suit).toBeDefined();
    expect(suit.execute).toBeDefined();
  });

  it("should create a new customer successfully", async () => {
    const data = await suit.execute(customerMock);
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name", customerMock.name);
  });

  it("should fail if name is empty or undefined", async () => {
    await expect(
      suit.execute({
        name: "",
      })
    ).rejects.toHaveProperty("message", "name isn't valid");

    await expect(
      suit.execute({
        //@ts-ignore
        name: undefined,
      })
    ).rejects.toHaveProperty("message", "name isn't valid");
  });

  it("should fail if a customer with the same name already exists", async () => {
    await expect(suit.execute(customerMock)).rejects.toHaveProperty(
      "message",
      "customer with this name already exists"
    );
  });
});
