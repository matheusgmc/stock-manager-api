import { OrderEntity } from "entities/order.entity";
import {
  IOrderRepository,
  IOrderRepositoryFindMany,
  IOrderRepositoryFindUnique,
} from "repositories/order.repository.interface";

export class InMemoryOrderRepository implements IOrderRepository {
  private orders: OrderEntity[] = [];

  create(data: OrderEntity): Promise<void> {
    this.orders.push(data);
    return Promise.resolve();
  }

  findUnique(data: IOrderRepositoryFindUnique): Promise<OrderEntity | null> {
    const order = this.orders.find((e) => e.id === data.id);

    return Promise.resolve(order || null);
  }
  findMany(data: IOrderRepositoryFindMany): Promise<OrderEntity[]> {
    const ids = Array.isArray(data.id) ? data.id : [data.id];
    const orders = this.orders.filter((e) => ids.includes(e.id));

    return Promise.resolve(orders);
  }
}
