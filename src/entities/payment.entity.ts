export const PAYMENT_METHODS = ["PIX", "CASH"] as const;
export const PAYMENT_STATUS = ["PENDING", "DONE"] as const;

export type IPaymentStatus = (typeof PAYMENT_STATUS)[number];
export type IPaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface IPaymentEntityNew {
  status: IPaymentStatus | string;
  method: IPaymentMethod | string;
}

export interface IPaymentEntity {
  status: IPaymentStatus;
  method: IPaymentMethod;
}

export class PaymentEntity implements IPaymentEntity {
  status: IPaymentStatus;
  method: IPaymentMethod;

  constructor(props: IPaymentEntity) {
    this.status = props.status;
    this.method = props.method;
    Object.freeze(this);
  }
  static create(data: IPaymentEntityNew): PaymentEntity | Error {
    if (!PAYMENT_STATUS.includes(data.status as any))
      return new Error("PAYMENT_STATUS_IS_INVALID");

    if (!PAYMENT_METHODS.includes(data.method as any))
      return new Error("PAYMENT_METHOD_IS_INVALID");

    return new PaymentEntity({
      status: data.status as IPaymentStatus,
      method: data.method as IPaymentMethod,
    });
  }
}
