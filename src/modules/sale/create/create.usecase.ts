import {
  ICustomerRepository,
  IProductRepository,
  ISaleRepository,
} from "repositories";

import {
  CustomerEntity,
  PaymentEntity,
  ProductEntity,
  SaleEntity,
} from "entities";

import { Validation } from "../../../utils/validation";
import { ICreateSaleRequestDTO } from "./create.dto";

export class CreateSaleUseCase {
  constructor(
    private SaleRepository: ISaleRepository,
    private ProductRepository: IProductRepository,
    private CustomerRepository: ICustomerRepository
  ) {}

  async execute(dto: ICreateSaleRequestDTO): Promise<SaleEntity> {
    if (Validation.ObjectIsEmpty(dto)) throw new Error("dto must not be empty");

    if (!dto.product_id || !dto.customer_id) throw new Error("dto isn't valid");

    const productData = await this.ProductRepository.findUnique({
      where: {
        id: dto.product_id,
      },
    });

    if (!productData) throw new Error("product not found");

    const customerData = await this.CustomerRepository.findUnique({
      where: {
        id: dto.customer_id,
      },
    });
    if (!customerData) throw new Error("customer not found");

    const payment = PaymentEntity.create({
      status: dto.payment_status,
      method: dto.payment_method,
    });
    const product = ProductEntity.create(productData);
    const customer = CustomerEntity.create(customerData);

    const newSale = await this.SaleRepository.create({
      customer,
      product: {
        ...product,
        quantity_purchased: dto.quantity_purchased,
      },
      payment,
      total_price: dto.quantity_purchased * product.price_unit,
      created_at: new Date().toISOString(),
    });

    return SaleEntity.create(newSale);
  }
}
