import { CustomerEntity } from "entities";
import { ICustomerRepository } from "repositories";

import { ICreateCustomerRequestDTO } from "./create.dto";

export class CreateCustomerUseCase {
  constructor(private CustomerRepository: ICustomerRepository) {}

  async execute(data: ICreateCustomerRequestDTO): Promise<CustomerEntity> {
    if (!data.name) throw new Error("name isn't valid");

    const isExist = await this.CustomerRepository.findUnique({
      where: { name: data.name },
    });

    if (isExist) throw new Error("customer with this name already exists");

    const newCustomer = await this.CustomerRepository.create({
      name: data.name,
    });

    return CustomerEntity.create(newCustomer);
  }
}
