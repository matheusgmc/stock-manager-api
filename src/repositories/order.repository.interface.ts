import { OrderEntity } from "entities/order.entity";

export interface IOrderRepositoryFindUnique {
  id: string;
}

export interface IOrderRepositoryFindMany {
  id: string | string[];
}

export interface IOrderRepository {
  create(data: OrderEntity): Promise<void>;
  findUnique(data: IOrderRepositoryFindUnique): Promise<OrderEntity | null>;
  findMany(data: IOrderRepositoryFindMany): Promise<OrderEntity[]>;
}
