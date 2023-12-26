import { PrismaCustomerRepository } from "implements/prisma/prisma.customer.respository";
import { PrismaOrderRepository } from "implements/prisma/prisma.order.repository";
import { PrismaSaleRepository } from "implements/prisma/prisma.sale.repository";
import { SaleController } from "./sale.controller";
import { SaleUseCases } from "./sale.usecases";

export * from "./sale.dto";
export * from "./sale.usecases";

const saleUseCases = new SaleUseCases(
  new PrismaSaleRepository(),
  new PrismaCustomerRepository(),
  new PrismaOrderRepository(),
);

const saleController = new SaleController(saleUseCases);

export { saleUseCases, saleController };
