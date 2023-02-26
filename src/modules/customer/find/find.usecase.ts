import { ICustomerRepository } from "repositories";
import { CustomerEntity } from "entities";

import { Validation } from "../../../utils/validation";
import { IFindCustomerRequestDTO } from "./find.dto";

export class FindCustomerUseCase {
  constructor(private CustomerRepository: ICustomerRepository) {}

  async execute(
    dto: IFindCustomerRequestDTO
  ): Promise<CustomerEntity | CustomerEntity[]> {
    let data = null;
    if (Validation.ObjectIsEmpty(dto)) {
      const data = await this.CustomerRepository.findMany({ where: {} });
      return data.map((elem) => CustomerEntity.create(elem));
    }

    if (dto.id) {
      data = await this.CustomerRepository.findUnique({
        where: {
          id: dto.id,
        },
      });
    }

    if (dto.name) {
      data = await this.CustomerRepository.findUnique({
        where: {
          name: dto.name,
        },
      });
    }

    if (Array.isArray(data)) {
      return data.map((elem) => CustomerEntity.create(elem));
    }

    return data ? CustomerEntity.create(data) : [];
  }
}
