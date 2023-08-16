import { Product } from "../../entities/product";
import { ProductsRepository } from "../productsRepository";

export class InMemoryProductsRepository implements ProductsRepository {
  public products: Product[] = [];

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: string): Promise<Product | undefined> {
    return this.products.find((product) => product.id === id);
  }

  async findByProductIdAndUserId(
    productId: string,
    userId: string
  ): Promise<Product | undefined> {
    return this.products.find(
      (product) => product.id === productId && userId === product.userId
    );
  }

  async findIndex(id: string): Promise<number> {
    const index = this.products.findIndex((p) => p.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update(product: Product): Promise<void> {
    const productToUpdate = this.products.find((p) => p.id === product.id);

    if (productToUpdate !== undefined) {
      Object.assign(productToUpdate, product);
    }
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.products.findIndex((product) => product.id === id);

    if (userIndex !== -1) {
      this.products.splice(userIndex, 1);
    }
  }
}
