import { ProductEntity } from "../../../entities";
import { IProductRepository } from "../../../implements/product.repository.interface";
import { NotFoundError } from "../../errors";
import { IFindProductRequestDTO } from "./find.dto";

export class FindProductUseCase {
  constructor(private ProductRepository: IProductRepository) {}

  async execute(
    dto: IFindProductRequestDTO
  ): Promise<ProductEntity | ProductEntity[] | Error> {
    let data = null;

    if (dto.id) {
      data = await this.ProductRepository.findUnique({
        where: {
          id: dto.id,
        },
      });
      if (!data) return new NotFoundError("product not found");
    }

    if (dto.name) {
      data = await this.ProductRepository.findUnique({
        where: {
          name: dto.name,
        },
      });
      if (!data) return new NotFoundError("product not found");
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
