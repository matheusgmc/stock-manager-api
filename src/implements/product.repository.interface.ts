import {
  ProductData,
  IProductDataNew,
} from "../database/entities/product.data.entity";

export type IProductRepositoryCreate = Omit<
  IProductDataNew,
  "id" | "amount" | "updated_at"
> & {
  amount?: number;
};

export interface IProductRepositoryFindUnique {
  where: Partial<Pick<IProductDataNew, "id" | "name">>;
}

export interface IProductRepositoryFindMany {
  where: Partial<IProductDataNew>;
}

export interface IProductRepositoryUpdate {
  where: Pick<IProductDataNew, "id">;
  data?: Partial<Omit<IProductDataNew, "id">>;
}

export interface IProductRepository {
  create(data: IProductRepositoryCreate): Promise<ProductData>;

  findUnique(data: IProductRepositoryFindUnique): Promise<ProductData | null>;
  findMany(data: IProductRepositoryFindMany): Promise<ProductData[]>;

  findAndUpdateName(id: string, name: string): Promise<void>;
  findAndUpdatePriceUnit(id: string, price_unit: number): Promise<void>;
  findAndUpdateAmount(id: string, amount: number): Promise<void>;

  findByIdAndDelete(id: string): Promise<void>;
}
