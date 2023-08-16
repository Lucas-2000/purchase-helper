import { UsersRepository } from "./../../../repositories/usersRepository";
import { ProductsRepository } from "./../../../repositories/productsRepository";
import { ProductProps } from "./../../../entities/product";

interface FindProductByUserIdAndProductIdRequest {
  userId: string;
  productId: string;
}

type FindProductByUserIdAndProductIdResponse = ProductProps;

export class FindProductByUserIdAndProductIdService {
  constructor(
    private productsRepository: ProductsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    productId,
  }: FindProductByUserIdAndProductIdRequest): Promise<FindProductByUserIdAndProductIdResponse> {
    const productExists = await this.productsRepository.findById(productId);

    if (!productExists) throw new Error("Product not found");

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new Error("User not found");

    const product = await this.productsRepository.findByProductIdAndUserId(
      productId,
      userId
    );

    if (!product) throw new Error("Product not found");

    return product.getSummary();
  }
}
