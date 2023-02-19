import { CustomerData } from "../database/entities/customer.data.entity";

export interface ICustomerEntityNew {
  id: string;
  name: string;
}
export class CustomerEntity implements ICustomerEntityNew {
  id: string;
  name: string;

  constructor(props: ICustomerEntityNew) {
    Object.assign(this, props);
    Object.freeze(this);
  }
  static create(data: CustomerData): CustomerEntity {
    return new CustomerEntity(data);
  }
}
