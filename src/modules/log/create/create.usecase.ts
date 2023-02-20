import { CustomerEntity, ProductEntity } from "../../../entities";
import { ICustomerRepository, IProductRepository } from "../../../implements";
import { ILogRepository } from "../../../implements/log.repository.interface";
import { ICreateLogRequestDTO } from "./create.dto";

export class CreateLogUseCase {
  constructor(
    private LogRepository: ILogRepository,
    private CustomerRepository: ICustomerRepository,
    private ProductRepository: IProductRepository
  ) {}

  async execute(dto: ICreateLogRequestDTO): Promise<void> {
    if (!dto.customer_id || !dto.product_id)
      throw new Error("params isn't valid");

    const customerIsExist = await this.CustomerRepository.findUnique({
      where: { id: dto.customer_id },
    });
    if (!customerIsExist) throw new Error("customer not found");

    const customer = CustomerEntity.create(customerIsExist);

    const productIsExist = await this.ProductRepository.findUnique({
      where: { id: dto.product_id },
    });
    if (!productIsExist) throw new Error("product not found");

    const product = ProductEntity.create(productIsExist);

    await this.LogRepository.create({
      product,
      customer,
    });
  }
}
