export interface IProductCreateRequestDTO {
  name: string;
  price_unit: number;
  amount?: number;
}

export interface IProductUpdateRequestDTO {
  id: string;
  data: {
    name?: string;
    price_unit?: number;
    amount?: number;
  };
}

export interface IProductFindByIdRequestDTO {
  id: string;
}
