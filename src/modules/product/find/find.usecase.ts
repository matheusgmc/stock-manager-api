import { ProductEntity } from "../../../entities";
import { IProductRepository } from "../../../implements/product.repository.interface";
import { IFindProductRequestDTO } from "./find.dto";

export class FindProductUseCase {
  constructor(private ProductRepository: IProductRepository) {}

  async execute(
    dto: IFindProductRequestDTO
  ): Promise<ProductEntity | ProductEntity[]> {
    let data = null;

    if (dto.id) {
      data = await this.ProductRepository.findUnique({
        where: {
          id: dto.id,
        },
      });
    }

    if (dto.name) {
      data = await this.ProductRepository.findUnique({
        where: {
          name: dto.name,
        },
      });
    }
    if (!data) {
      data = await this.ProductRepository.findMany({ where: {} });
    }

    if (Array.isArray(data)) {
      return data.map((elem) => ProductEntity.create(elem));
    }

    return data ? ProductEntity.create(data) : [];
  }
}
