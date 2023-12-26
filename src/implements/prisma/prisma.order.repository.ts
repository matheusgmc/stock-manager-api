import { OrderEntity } from "entities/order.entity";
import {
  IOrderRepository,
  IOrderRepositoryFindMany,
  IOrderRepositoryFindUnique,
} from "repositories/order.repository.interface";

export class PrismaOrderRepository implements IOrderRepository {
  async findUnique(data: IOrderRepositoryFindUnique): Promise<OrderEntity> {
    return {} as any;
  }

  create(data: OrderEntity): Promise<void> {
    return {} as any;
  }

  findMany(data: IOrderRepositoryFindMany): Promise<OrderEntity[]> {
    return [] as any;
  }
}
