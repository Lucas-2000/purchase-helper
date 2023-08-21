import { UsersRepository } from "./../../../repositories/usersRepository";
import { ProductsRepository } from "./../../../repositories/productsRepository";
import { ProductProps } from "./../../../entities/product";

interface FindProductByUserIdRequest {
  userId: string;
}

type FindProductByUserIdResponse = ProductProps[];

export class FindProductByUserIdService {
  constructor(
    private productsRepository: ProductsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
  }: FindProductByUserIdRequest): Promise<FindProductByUserIdResponse> {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new Error("User not found");

    const products = await this.productsRepository.findByUserId(userId);

    if (!products) return [];

    const productsSummary: ProductProps[] = products.map((product) =>
      product.getSummary()
    );

    return productsSummary;
  }
}
