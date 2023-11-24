import { CustomerUseCases, ICustomerCreateRequestDTO } from "modules/customer";
import { inMemoryCustomerRepository } from "../../implements";

describe("Customer - Create - UseCase", () => {
  const suit = new CustomerUseCases(inMemoryCustomerRepository);
  const dto: ICustomerCreateRequestDTO = {
    name: "test",
  };

  it("should be defined", async () => {
    expect(suit.create).toBeDefined();
  });

  it("should create a new customer successfully", async () => {
    const data = await suit.create(dto);
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name", dto.name);
  });

  it("should fail if the name is empty or undefined", async () => {
    expect(
      await suit.create({
        name: "",
      }),
    ).toHaveProperty("message", "NAME_PARAMS_INVALID");

    expect(
      await suit.create({
        //@ts-ignore
        name: undefined,
      }),
    ).toHaveProperty("message", "NAME_PARAMS_INVALID");
  });

  it("should fail if a customer with the same name already exists", async () => {
    expect(await suit.create(dto)).toHaveProperty(
      "message",
      "NAME_ALREADY_EXISTS",
    );
  });
});
