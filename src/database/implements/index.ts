import { PrismaProductRepository } from "./prisma.product.repository";
import { PrismaCustomerRepository } from "./prisma.customer.repository";
import { PrismaSaleRepository } from "./prisma.sale.repository";

export const prismaProductRepository = new PrismaProductRepository();
export const prismaCustomerRepository = new PrismaCustomerRepository();
export const prismaSaleRepository = new PrismaSaleRepository();
