import crypto from "node:crypto";

export interface ICustomerEntityNew {
  id?: string;
  name: string;
}

export class CustomerEntity {
  id: string;
  name: string;

  constructor(props: ICustomerEntityNew) {
    this.id = props.id;
    this.name = props.name;
  }
  static create(data: ICustomerEntityNew): CustomerEntity {
    if (!data.id) data.id = crypto.randomUUID();

    return new CustomerEntity(data);
  }
}
