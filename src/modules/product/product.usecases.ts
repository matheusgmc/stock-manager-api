import { ProductEntity } from "entities/product.entity";
import { IProductRepository } from "repositories/product.repository.interface";
import {
  IProductCreateRequestDTO,
  IProductFindByIdRequestDTO,
  IProductUpdateRequestDTO,
} from "./product.dto";
import {
  AlreadyExistsError,
  DtoIsEmptyError,
  NotFoundError,
  ParamsInvalidError,
  ParamsRequiredError,
} from "modules/errors";

export class ProductUseCases {
  constructor(private productRepository: IProductRepository) { }

  async create(data: IProductCreateRequestDTO): Promise<ProductEntity | Error> {
    if (!data.name) return new ParamsInvalidError("name");
    if (!data.unit_price) return new ParamsInvalidError("unit_price");

    if (
      await this.productRepository.findUnique({
        where: {
          name: data.name,
        },
      })
    )
      return new AlreadyExistsError("product");

    const product = ProductEntity.create(data);

    if (product instanceof Error) {
      return product;
    }

    await this.productRepository.create(product);

    return product;
  }

  async update({
    id,
    data,
  }: IProductUpdateRequestDTO): Promise<ProductEntity | Error> {
    if (!id) return new ParamsRequiredError("id");

    if (!data || Object.keys(data || {}).length === 0)
      return new DtoIsEmptyError("data");

    const product = await this.productRepository.findUnique({
      where: { id },
    });
    if (!product) return new NotFoundError("product");

    if (data.name) {
      if (
        await this.productRepository.findUnique({
          where: { name: data.name },
        })
      )
        return new AlreadyExistsError("product");

      product.changeName(data.name);
    }

    if (data.unit_price) {
      product.changePrice(data.unit_price);
    }

    if (data.amount) {
      product.setAmount(data.amount);
    }

    await this.productRepository.update(product);

    return product;
  }

  async findById(
    data: IProductFindByIdRequestDTO,
  ): Promise<ProductEntity | null | Error> {
    if (!data.id) {
      return new ParamsInvalidError("id");
    }
    return await this.productRepository.findUnique({ where: { id: data.id } });
  }
}
