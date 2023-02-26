import { ProductEntity } from "entities";
import { IProductRepository } from "repositories";

import { ProductData } from "../../../database/entities/product.data.entity";
import { UtilsDate } from "../../../utils/date";
import { Validation } from "../../../utils/validation";
import {
  NotFoundError,
  ParamsInvalidError,
  ParamsRequiredError,
} from "../../errors";
import { IUpdateProductRequestDTO } from "./update.dto";

export class UpdateProductUseCase {
  constructor(private ProductRepository: IProductRepository) {}

  async execute(dto: IUpdateProductRequestDTO): Promise<Error | ProductEntity> {
    if (!dto.id) return new ParamsRequiredError("id is required");

    if (!dto.data || Validation.ObjectIsEmpty(dto.data))
      return new ParamsRequiredError("at least one data is required");

    if (!Validation.ObjectKeyIsValid(ProductEntity, dto.data))
      return new ParamsInvalidError("data isn't valid");

    const original = await this.ProductRepository.findUnique({
      where: { id: dto.id },
    });

    if (!original) return new NotFoundError("product not found");

    const changedProduct = ProductEntity.create({
      ...original,
      name: getNameToBeUsed(dto, original),
      price_unit: getPriceUnitToBeUsed(dto, original),
      amount: getAmountToBeUsed(dto, original),
    });

    const today = UtilsDate.getTodayWithoutHours();

    if (shouldChangeName(dto)) {
      await this.ProductRepository.findAndUpdateName(
        dto.id,
        changedProduct.name,
        today
      );
    }

    if (shouldChangePriceUnit(dto)) {
      await this.ProductRepository.findAndUpdatePriceUnit(
        dto.id,
        changedProduct.price_unit,
        today
      );
    }

    if (shouldChangeAmount(dto)) {
      await this.ProductRepository.findAndUpdateAmount(
        dto.id,
        changedProduct.amount,
        today
      );
    }

    return ProductEntity.create(
      (await this.ProductRepository.findUnique({
        where: { id: dto.id },
      })) as ProductEntity
    );
  }
}

function shouldChangeName({ data }: IUpdateProductRequestDTO): boolean {
  return Object.keys(data).indexOf("name") !== -1;
}
function shouldChangePriceUnit({ data }: IUpdateProductRequestDTO): boolean {
  return Object.keys(data).indexOf("price_unit") !== -1;
}
function shouldChangeAmount({ data }: IUpdateProductRequestDTO): boolean {
  return Object.keys(data).indexOf("amount") !== -1;
}

function getNameToBeUsed(
  dtoUpdate: IUpdateProductRequestDTO,
  original: ProductData
): string {
  return shouldChangeName(dtoUpdate) ? dtoUpdate.data.name : original.name;
}

function getPriceUnitToBeUsed(
  dtoUpdate: IUpdateProductRequestDTO,
  original: ProductData
): number {
  return shouldChangePriceUnit(dtoUpdate)
    ? dtoUpdate.data.price_unit
    : original.price_unit;
}

function getAmountToBeUsed(
  dtoUpdate: IUpdateProductRequestDTO,
  original: ProductData
): number {
  return shouldChangeAmount(dtoUpdate)
    ? dtoUpdate.data.amount
    : original.amount;
}
