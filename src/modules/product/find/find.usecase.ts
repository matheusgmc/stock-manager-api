import { ProductEntity } from "../../../entities";
import { IProductRepository } from "../../../implements/product.repository.interface";
import { IFindProductRequestDTO } from "./find.dto";

export class FindProductUseCase {
  constructor(private ProductRepository: IProductRepository) {}

  async execute(
    dto: IFindProductRequestDTO
  ): Promise<ProductEntity | ProductEntity[]> {
    let data = null;

    if (Object.entries(dto).length == 0) {
      const data = await this.ProductRepository.findMany({ where: {} });
      return data.map((elem) => ProductEntity.create(elem));
    }

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

    if (Array.isArray(data)) {
      return data.map((elem) => ProductEntity.create(elem));
    }
    return data ? ProductEntity.create(data) : [];
  }
}
