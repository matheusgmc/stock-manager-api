import { ProductData } from "../../../database/entities/product.data.entity";
import { ProductEntity } from "../../../entities";
import { IProductRepository } from "../../../implements/product.repository.interface";
import { IUpdateProductRequestDTO } from "./update.dto";

export class UpdateProductUseCase {
  constructor(private ProductRepository: IProductRepository) {}

  async execute(dto: IUpdateProductRequestDTO): Promise<ProductEntity> {
    if (!dto.id) throw new Error("id is required");

    if (!dto.data || Object.entries(dto.data).length == 0)
      throw new Error("at least one data is required");

    const original = await this.ProductRepository.findUnique({
      where: { id: dto.id },
    });

    if (!original) throw new Error("product not found");

    const changedProduct = ProductEntity.create({
      ...original,
      name: getNameToBeUsed(dto, original),
      price_unit: getPriceUnitToBeUsed(dto, original),
      amount: getAmountToBeUsed(dto, original),
    });

    if (shouldChangeName(dto)) {
      await this.ProductRepository.findAndUpdateName(
        dto.id,
        changedProduct.name
      );
    }

    if (shouldChangePriceUnit(dto)) {
      await this.ProductRepository.findAndUpdatePriceUnit(
        dto.id,
        changedProduct.price_unit
      );
    }

    if (shouldChangeAmount(dto)) {
      await this.ProductRepository.findAndUpdateAmount(
        dto.id,
        changedProduct.amount
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