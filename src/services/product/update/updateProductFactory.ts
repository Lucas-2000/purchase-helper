import { PrismaProductsRepository } from "../../../repositories/prisma/prismaProductsRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { UpdateProductController } from "./updateProductController";
import { UpdateProductService } from "./updateProductService";

export const UpdateProductFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const productsRepository = new PrismaProductsRepository();

  const updateProductService = new UpdateProductService(
    productsRepository,
    usersRepository
  );

  const updateProductController = new UpdateProductController(
    updateProductService
  );

  return updateProductController;
};
