export const PAYMENT_METHODS = ["PIX", "CASH"] as const;
export const PAYMENT_STATUS = ["PENDING", "DONE"] as const;

export type IPaymentStatus = (typeof PAYMENT_STATUS)[number];
export type IPaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface IPaymentEntityNew {
  status: IPaymentStatus;
  method: IPaymentMethod;
}

export interface IPaymentEntityCreate {
  status: string;
  method: string;
}
export class PaymentEntity implements IPaymentEntityNew {
  status: IPaymentStatus;
  method: IPaymentMethod;

  constructor(props: IPaymentEntityNew) {
    Object.assign(this, props);
    Object.freeze(this);
  }
  static create(data: IPaymentEntityCreate): PaymentEntity {
    if (!PAYMENT_STATUS.includes(data.status as any))
      throw new Error("payment status is invalid");

    if (!PAYMENT_METHODS.includes(data.method as any))
      throw new Error("payment method is invalid");

    return new PaymentEntity({
      status: data.status as IPaymentStatus,
      method: data.method as IPaymentMethod,
    });
  }
}
