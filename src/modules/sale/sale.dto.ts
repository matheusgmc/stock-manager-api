import { IPaymentMethod, IPaymentStatus } from "entities/payment.entity";

export interface ISaleCreateRequestDTO {
  product_id: string;
  customer_id: string;
  payment_method: IPaymentMethod;
  payment_status: IPaymentStatus;
  qtd: number;
}

export interface ISaleFindByIdRequestDTO {
  id: string;
}

export interface ISaleFindByCustomerIdRequestDTO {
  customer_id: string;
}

export interface ISaleFindByProductIdRequestDTO {
  product_id: string;
}

export interface ISaleFindByPaymentRequestDTO {
  method?: IPaymentMethod;
  status?: IPaymentStatus;
}
export interface ISaleFindRequestDTO
  extends ISaleFindByCustomerIdRequestDTO,
  ISaleFindByProductIdRequestDTO { }
