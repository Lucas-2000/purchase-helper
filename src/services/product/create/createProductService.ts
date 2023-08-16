import { Product, ProductProps } from "../../../entities/product";
import { ProductsRepository } from "./../../../repositories/productsRepository";
import { randomUUID } from "node:crypto";

interface CreateProductRequest {
  id?: string;
  name: string;
  description?: string;
  price?: number;
  quantity: number;
  purchaseStart?: Date;
  purchaseFinish?: Date;
  userId: string;
}

type CreateProductResponse = ProductProps;

export class CreateProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
    name,
    description,
    price,
    quantity,
    purchaseStart,
    purchaseFinish,
    userId,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const product = new Product({
      id: id ?? randomUUID(),
      name,
      description,
      price,
      quantity,
      purchaseStart,
      purchaseFinish,
      userId,
    });

    await this.productsRepository.create(product);

    return product.getSummary();
  }
}
