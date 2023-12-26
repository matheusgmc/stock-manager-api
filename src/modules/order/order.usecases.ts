import { OrderEntity } from "entities/order.entity";
import { NotFoundError, ParamsInvalidError } from "modules/errors";
import { IOrderRepository, IProductRepository } from "repositories";
import { OrderCreateRequestDTO } from "./order.dto";

export class OrderUseCases {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
  ) { }

  async create(dto: OrderCreateRequestDTO): Promise<OrderEntity | Error> {
    const data = OrderCreateRequestDTO.validate(dto);

    if (data instanceof Error) return data;

    const product = await this.productRepository.findUnique({
      where: {
        id: data.product_id,
      },
    });

    if (!product) return new NotFoundError("product");

    const order = OrderEntity.create({
      qtd: data.qtd,
      product,
    });

    if (order instanceof Error) return order;

    await this.orderRepository.create(order);

    return order;
  }
}
