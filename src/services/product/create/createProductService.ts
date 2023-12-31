import { UsersRepository } from "./../../../repositories/usersRepository";
import { Product, ProductProps } from "../../../entities/product";
import { ProductsRepository } from "./../../../repositories/productsRepository";
import { randomUUID } from "node:crypto";

interface CreateProductRequest {
  id?: string;
  name: string;
  description?: string;
  price?: number;
  quantity: number;
  userId: string;
}

type CreateProductResponse = ProductProps;

export class CreateProductService {
  constructor(
    private productsRepository: ProductsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    id,
    name,
    description,
    price,
    quantity,
    userId,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new Error("User not found");

    const product = new Product({
      id: id ?? randomUUID(),
      name,
      description: description ?? null,
      price: price ?? null,
      quantity: quantity ?? null,
      userId,
    });

    await this.productsRepository.create(product);

    return product.getSummary();
  }
}
