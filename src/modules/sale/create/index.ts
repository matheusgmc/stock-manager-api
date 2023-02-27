import { CreateSaleUseCase } from "./create.usecase";
import { ICreateSaleRequestDTO } from "./create.dto";
import { CreateSaleController } from "./create.controller";
import { PrismaSaleRepository } from "database/implements/prisma.sale.repository";
import { PrismaProductRepository } from "database/implements/prisma.product.repository";
import { PrismaCustomerRepository } from "database/implements/prisma.customer.repository";

const saleRepository = new PrismaSaleRepository();
const productRepository = new PrismaProductRepository();
const customerRepository = new PrismaCustomerRepository();

const createSaleUseCase = new CreateSaleUseCase(
  saleRepository,
  productRepository,
  customerRepository
);

const createSaleController = new CreateSaleController(createSaleUseCase);

export {
  createSaleUseCase,
  createSaleController,
  CreateSaleController,
  CreateSaleUseCase,
  ICreateSaleRequestDTO,
};
