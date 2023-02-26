import { InMemoryCustomerRepository } from "./in-memory.customer.repository";
import { InMemoryHistoryRepository } from "./in-memory.history.repository";
import { InMemoryProductRepository } from "./in-memory.product.repository";
import { InMemorySaleRepository } from "./in-memory.sale.repository";

export const inMemoryProductRepository = new InMemoryProductRepository();
export const inMemoryCustomerRepository = new InMemoryCustomerRepository();
export const inMemorySaleRepository = new InMemorySaleRepository();
export const inMemoryHistoryRepository = new InMemoryHistoryRepository();