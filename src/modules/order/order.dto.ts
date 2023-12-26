import {
  DtoIsEmptyError,
  ParamsInvalidError,
  ParamsRequiredError,
} from "modules/errors";

export class OrderCreateRequestDTO {
  product_id: string;
  qtd: number;

  private constructor(data: OrderCreateRequestDTO) {
    this.product_id = data.product_id;
    this.qtd = data.qtd;
  }

  static validate(data: OrderCreateRequestDTO): OrderCreateRequestDTO | Error {
    if (!Object.keys(data).length) return new DtoIsEmptyError("data");

    if (!data.product_id) return new ParamsRequiredError("product_id");

    if (!data.qtd) return new ParamsRequiredError("qtd");

    if (Number.isNaN(data.qtd)) return new ParamsInvalidError("qtd");

    return new OrderCreateRequestDTO(data);
  }
}
