import { ProductEntity } from "entities/product.entity";

export interface IProductRepositoryFindUnique {
  where: Partial<Pick<ProductEntity, "id" | "name">>;
}

export interface IProductRepository {
  create(data: ProductEntity): Promise<void>;

  update(data: ProductEntity): Promise<void>;

  findUnique(data: IProductRepositoryFindUnique): Promise<ProductEntity | null>;
}
