import { CustomerEntity } from "entities/customer.entity";
import {
  ICustomerCreateRequestDTO,
  ICustomerFindByIdRequestDTO,
} from "./customer.dto";
import { ICustomerRepository } from "repositories/customer.repository.interface";
import { AlreadyExistsError, ParamsInvalidError } from "modules/errors";

export class CustomerUseCases {
  constructor(private customerRepository: ICustomerRepository) { }
  async create(
    data: ICustomerCreateRequestDTO,
  ): Promise<CustomerEntity | Error> {
    if (!data.name) return new ParamsInvalidError("name");
    if (
      await this.customerRepository.findUnique({
        where: { name: data.name },
      })
    ) {
      return new AlreadyExistsError("name");
    }

    const customer = CustomerEntity.create({
      name: data.name,
    });

    await this.customerRepository.create(customer);

    return customer;
  }

  async findById(
    data: ICustomerFindByIdRequestDTO,
  ): Promise<CustomerEntity | null | Error> {
    if (!data.id) return new ParamsInvalidError("id");

    const customer = await this.customerRepository.findUnique({
      where: {
        id: data.id,
      },
    });

    return customer;
  }
}
