export interface IProductCreateRequestDTO {
  name: string;
  unit_price: number;
  amount?: number;
}

export interface IProductUpdateRequestDTO {
  id: string;
  data: {
    name?: string;
    unit_price?: number;
    amount?: number;
  };
}

export interface IProductFindByIdRequestDTO {
  id: string;
}
