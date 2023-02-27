import { SaleData } from "../database/entities";
import { SaleEntity } from "entities";

export type ISaleRepositoryCreate = Omit<SaleEntity, "id">;

export interface ISaleRepositoryFindUniqueData {
  where: Partial<Pick<SaleEntity, "id">>;
}

export interface ISaleRepositoryFindManyData {
  where?: Partial<Omit<SaleEntity, "id">>;
}

export interface ISaleRepository {
  create(data: ISaleRepositoryCreate): Promise<SaleData>;
  findUnique(data: ISaleRepositoryFindUniqueData): Promise<SaleData | null>;
  findMany(data: ISaleRepositoryFindManyData): Promise<SaleData[]>;
}
