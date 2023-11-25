import { IProductRepository, IProductRepositoryFindUnique } from "repositories";
import { ProductEntity } from "entities/product.entity";

export class InMemoryProductRepository implements IProductRepository {
  private Products: ProductEntity[] = [
    new ProductEntity({
      id: "1",
      name: "test_mock_1",
      unit_price: 1,
      amount: 1,
      created_at: new Date("21/02/2023"),
      updated_at: new Date("21/02/2023"),
    }),
    new ProductEntity({
      id: "2",
      name: "test_mock_2",
      unit_price: 1,
      amount: 1,
      created_at: new Date("22/02/2023"),
      updated_at: new Date("23/02/2023"),
    }),
  ];

  async create(data: ProductEntity): Promise<void> {
    this.Products.push(data);
    return Promise.resolve();
  }

  async update(data: ProductEntity): Promise<void> {
    const index = this.Products.findIndex((e) => e.id === data.id);
    if (index !== -1) {
      this.Products[index] = data;
    }

    return Promise.resolve();
  }

  async findUnique(
    data: IProductRepositoryFindUnique,
  ): Promise<ProductEntity | null> {
    const { name, id } = data.where;
    const product = this.Products.find((elem) => {
      if (elem.name == name || elem.id == id) {
        return elem;
      }
    });
    return product || null;
  }
}
