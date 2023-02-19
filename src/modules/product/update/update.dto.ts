import { ProductEntity } from "../../../entities";

export interface IUpdateProductRequestDTO {
  id: string;
  data: Omit<ProductEntity, "id">;
}
