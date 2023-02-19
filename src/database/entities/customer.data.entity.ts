export class CustomerData {
  id: string;
  name: string;
  constructor(props: CustomerData) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
