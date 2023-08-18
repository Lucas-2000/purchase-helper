import { PrismaProductsRepository } from "../../../repositories/prisma/prismaProductsRepository";
import { DeleteProductController } from "./deleteProductController";
import { DeleteProductService } from "./deleteProductService";

export const DeleteProductFactory = () => {
  const productsRepository = new PrismaProductsRepository();

  const deleteProductService = new DeleteProductService(productsRepository);

  const deleteProductController = new DeleteProductController(
    deleteProductService
  );

  return deleteProductController;
};
