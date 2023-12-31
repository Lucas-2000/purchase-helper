import { Product } from "./../entities/product";
export interface ProductsRepository {
  create(product: Product): Promise<void>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByUserId(userId: string): Promise<Product[] | undefined>;
  findByProductIdAndUserId(
    productId: string,
    userId: string
  ): Promise<Product | undefined>;
  findIndex(id: string): Promise<number>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}
