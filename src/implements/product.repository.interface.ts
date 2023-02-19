import {
  ProductData,
  IProductDataNew,
} from "../database/entities/product.data.entity";

export type IProductRepositoryCreate = Omit<
  IProductDataNew,
  "id" | "amount"
> & {
  amount?: number;
};

export interface IProductRepositoryFind {
  where: Partial<IProductDataNew>;
}

export interface IProductRepositoryUpdate {
  where: Pick<IProductDataNew, "id">;
  data?: Partial<Omit<IProductDataNew, "id">>;
}

export interface IProductRepository {
  create(data: IProductRepositoryCreate): Promise<ProductData>;

  findUnique(data: IProductRepositoryFind): Promise<ProductData | null>;
  findMany(data: IProductRepositoryFind): Promise<ProductData[]>;

  findAndUpdateName(id: string, name: string): Promise<void>;
  findAndUpdatePriceUnit(id: string, price_unit: number): Promise<void>;
  findAndUpdateAmount(id: string, amount: number): Promise<void>;

  findByIdAndDelete(id: string): Promise<void>;
}
