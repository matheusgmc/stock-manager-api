import { PrismaProductRepository } from "implements/prisma/prisma.product.repository";
import { ProductController } from "./product.controller";
import { ProductUseCases } from "./product.usecases";

export * from "./product.usecases";
export * from "./product.dto";

const productUseCases = new ProductUseCases(new PrismaProductRepository());

const productController = new ProductController(productUseCases);

export { productUseCases, productController };
