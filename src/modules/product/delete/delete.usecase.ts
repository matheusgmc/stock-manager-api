import { ProductEntity } from "../../../entities";
import { IProductRepository } from "../../../implements";
import { IDeleteProductRequestDTO } from "./delete.dto";

export class DeleteProductUseCase {
  constructor(private ProductRepository: IProductRepository) {}

  async execute(dto: IDeleteProductRequestDTO): Promise<ProductEntity> {
    if (!dto.id) throw new Error("id isn't valid");

    const isExist = await this.ProductRepository.findUnique({
      where: { id: dto.id },
    });

    if (!isExist) throw new Error("product not found");

    await this.ProductRepository.findByIdAndDelete(dto.id);

    return ProductEntity.create(isExist);
  }
}
