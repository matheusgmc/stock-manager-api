import { PaymentEntity } from "entities/payment.entity";
import { SaleEntity } from "entities/sale.entity";
import {
  DtoIsEmptyError,
  NotFoundError,
  ParamsRequiredError,
} from "modules/errors";
import { ICustomerRepository } from "repositories/customer.repository.interface";
import { IOrderRepository } from "repositories/order.repository.interface";
import { ISaleRepository } from "repositories/sale.repository.interface";
import {
  ISaleCreateRequestDTO,
  ISaleFindByCustomerIdRequestDTO,
  ISaleFindByIdRequestDTO,
  ISaleFindByPaymentRequestDTO,
  ISaleFindByProductIdRequestDTO,
  ISaleFindRequestDTO,
} from "./sale.dto";

export class SaleUseCases {
  constructor(
    private saleRepository: ISaleRepository,
    private customerRepository: ICustomerRepository,
    private orderRepository: IOrderRepository,
  ) { }
  async create(data: ISaleCreateRequestDTO): Promise<SaleEntity | Error> {
    if (!data || Object.keys(data || {}).length === 0)
      return new DtoIsEmptyError("data");

    if (!data.order_ids) return new ParamsRequiredError("sale_ids");
    if (!data.customer_id) return new ParamsRequiredError("customer_id");

    const payment = PaymentEntity.create({
      method: data.payment_method,
      status: data.payment_status,
    });

    if (payment instanceof Error) return payment;

    const orders = await this.orderRepository.findMany({
      id: data.order_ids,
    });

    if (!orders.length) return new NotFoundError("product");

    const customer = await this.customerRepository.findUnique({
      where: { id: data.customer_id },
    });

    if (!customer) return new NotFoundError("customer");

    const sale = SaleEntity.create({
      payment,
      orders,
      customer,
    });

    if (sale instanceof Error) return sale;

    await this.saleRepository.create(sale);

    return sale;
  }

  async find(data: ISaleFindRequestDTO) {
    if (Object.keys(data).length === 0) return new DtoIsEmptyError("data");

    return await this.saleRepository.findMany({ where: data });
  }

  async findById(
    data: ISaleFindByIdRequestDTO,
  ): Promise<SaleEntity | null | Error> {
    if (!data.id) return new ParamsRequiredError("id");

    return await this.saleRepository.findUnique({ where: { id: data.id } });
  }

  async findByCustomerId(
    data: ISaleFindByCustomerIdRequestDTO,
  ): Promise<SaleEntity[] | Error> {
    if (!data.customer_id) return new ParamsRequiredError("customer_id");
    return await this.saleRepository.findMany({
      where: { customer_id: data.customer_id },
    });
  }

  async findByProductId(
    data: ISaleFindByProductIdRequestDTO,
  ): Promise<SaleEntity[] | Error> {
    if (!data.product_id) return new ParamsRequiredError("product_id");

    return await this.saleRepository.findMany({
      where: { product_id: data.product_id },
    });
  }

  async findByPayment(
    data: ISaleFindByPaymentRequestDTO,
  ): Promise<SaleEntity[] | Error> {
    if (!data.method && !data.status) return new DtoIsEmptyError("data");

    return await this.saleRepository.findMany({
      where: {
        payment_method: data.method,
        payment_status: data.status,
      },
    });
  }
}
