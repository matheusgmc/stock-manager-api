import { ProductEntity } from "../../../entities/product.entity";
import { IProductRepository } from "../../../implements/product.repository.interface";
import { ICreateProductRequestDTO } from "./create.dto";

export class CreateProductUseCase {
  constructor(private ProductRepository: IProductRepository) {}

  async execute(dto: ICreateProductRequestDTO): Promise<ProductEntity> {
    if (!dto.name || !dto.price_unit) throw new Error("params isn't valid");

    if (
      await this.ProductRepository.findUnique({
        where: {
          name: dto.name,
        },
      })
    )
      throw new Error("product already exists");

    const newProduct = await this.ProductRepository.create({
      price_unit: dto.price_unit,
      amount: dto.amount,
      name: dto.name,
    });

    return ProductEntity.create(newProduct);
  }
}
