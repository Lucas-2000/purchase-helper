import { ProductProps } from "../../../entities/product";
import { ProductsRepository } from "./../../../repositories/productsRepository";

type FindAllProductsResponse = ProductProps[];

export class FindAllProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<FindAllProductsResponse> {
    const products = await this.productsRepository.findAll();

    const productsSummary: ProductProps[] = products.map((product) =>
      product.getSummary()
    );

    return productsSummary;
  }
}
