import { PrismaCustomerRepository } from "implements/prisma/prisma.customer.respository";
import { CustomerController } from "./customer.controller";
import { CustomerUseCases } from "./customer.usecases";

export * from "./customer.usecases";
export * from "./customer.dto";

const customerUseCases = new CustomerUseCases(new PrismaCustomerRepository());

const customerController = new CustomerController(customerUseCases);

export { customerUseCases, customerController };
