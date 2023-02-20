import { CustomerEntity } from "../../../entities";
import { ICustomerRepository } from "../../../implements";
import { IFindCustomerRequestDTO } from "./find.dto";

export class FindCustomerUseCase {
  constructor(private CustomerRepository: ICustomerRepository) {}

  async execute(
    dto: IFindCustomerRequestDTO
  ): Promise<CustomerEntity | CustomerEntity[]> {
    let data = null;
    if (Object.entries(dto).length == 0) {
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
