import { randomUUID } from "node:crypto";
import { ProductData } from "../../src/database/entities/product.data.entity";
import {
  IProductRepository,
  IProductRepositoryCreate,
  IProductRepositoryFindMany,
  IProductRepositoryFindUnique,
} from "../../src/implements/product.repository.interface";

const Products: ProductData[] = [
  {
    id: "1",
    name: "test_mock_1",
    price_unit: 1,
    amount: 1,
  },
  {
    id: "2",
    name: "test_mock_2",
    price_unit: 1,
    amount: 1,
  },
];

export class InMemoryProductRepository implements IProductRepository {
  async create(data: IProductRepositoryCreate): Promise<ProductData> {
    const newProduct: ProductData = {
      id: randomUUID(),
      amount: data.amount ? data.amount : 0,
      price_unit: data.price_unit,
      name: data.name,
    };

    Products.push(newProduct);
    return new ProductData(newProduct);
  }

  async findUnique(
    data: IProductRepositoryFindUnique
  ): Promise<ProductData | null> {
    const { name, id } = data.where;
    const product = Products.find((elem) => {
      if (elem.name == name || elem.id == id) {
        return elem;
      }
    });
    return product ? new ProductData(product) : null;
  }

  async findMany(data: IProductRepositoryFindMany): Promise<ProductData[]> {
    const { name, price_unit, amount, id } = data.where;

    if (Object.entries(data.where).length == 0)
      return Products.map((elem) => new ProductData(elem));

    const products: ProductData[] = [];
    Products.forEach((elem) => {
      if (
        elem.name == name ||
        elem.id == id ||
        elem.price_unit == price_unit ||
        elem.amount == amount
      ) {
        products.push(elem);
      }
    });

    return products.map((elem) => new ProductData(elem));
  }

  async findAndUpdateName(id: string, name: string): Promise<void> {
    const index = Products.findIndex((elem) => elem.id == id);
    Products[index].name = name;
  }

  async findAndUpdatePriceUnit(id: string, price_unit: number): Promise<void> {
    const index = Products.findIndex((elem) => elem.id == id);
    Products[index].price_unit = price_unit;
  }

  async findAndUpdateAmount(id: string, amount: number): Promise<void> {
    const index = Products.findIndex((elem) => elem.id == id);
    Products[index].amount = amount;
  }

  async findByIdAndDelete(id: string): Promise<void> {
    const index = Products.findIndex((elem) => elem.id == id);
    Products.splice(index, 1);
  }
}
