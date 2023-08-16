import { ProductsRepository } from "./../../../repositories/productsRepository";

interface DeleteProductRequest {
  id: string;
}

type DeleteProductResponse = [];

export class DeleteProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ id }: DeleteProductRequest): Promise<DeleteProductResponse> {
    const product = await this.productsRepository.findById(id);

    if (!product) throw new Error("Product not found");

    await this.productsRepository.delete(id);

    return [];
  }
}
