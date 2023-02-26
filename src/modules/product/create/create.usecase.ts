import { IProductRepository } from "repositories";
import { ProductEntity } from "entities";

import { ICreateProductRequestDTO } from "./create.dto";

import {
  AlreadyExistsError,
  DtoIsEmptyError,
  ParamsInvalidError,
} from "../../errors";
import { Validation } from "../../../utils/validation";
import { UtilsDate } from "../../../utils/date";

export class CreateProductUseCase {
  constructor(private ProductRepository: IProductRepository) {}

  async execute(dto: ICreateProductRequestDTO): Promise<Error | ProductEntity> {
    if (!dto || Validation.ObjectIsEmpty(dto))
      return new DtoIsEmptyError("dto cannot be empty");

    if (!dto.name || !dto.price_unit)
      return new ParamsInvalidError("name or price_unit is invalid");

    if (
      await this.ProductRepository.findUnique({
        where: {
          name: dto.name,
        },
      })
    )
      return new AlreadyExistsError("product");

    const today = UtilsDate.getTodayWithoutHours();

    const newProduct = await this.ProductRepository.create({
      price_unit: dto.price_unit,
      amount: dto.amount,
      name: dto.name,
      created_at: today,
    });

    return ProductEntity.create(newProduct);
  }
}
