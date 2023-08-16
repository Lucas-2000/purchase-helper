import { UsersRepository } from "./../../../repositories/usersRepository";
import { ProductsRepository } from "./../../../repositories/productsRepository";
import { Product, ProductProps } from "../../../entities/product";

interface UpdateProductRequest {
  id: string;
  name: string;
  description?: string;
  price?: number;
  quantity: number;
  purchaseStart?: Date;
  purchaseFinish?: Date;
  userId?: string;
}

type UpdateProductResponse = ProductProps;

export class UpdateProductService {
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
    purchaseStart,
    purchaseFinish,
    userId,
  }: UpdateProductRequest): Promise<UpdateProductResponse> {
    const verifyIndex = await this.usersRepository.findIndex(id);

    if (verifyIndex < 0) throw new Error("Product not found!");

    const user = await this.usersRepository.findById(userId as string);

    if (!user) throw new Error("User not found!");

    const productToUpdate = new Product({
      id,
      name,
      description,
      price,
      quantity,
      purchaseStart,
      purchaseFinish,
      userId,
    });

    await this.productsRepository.update(productToUpdate);

    return productToUpdate.getSummary();
  }
}
