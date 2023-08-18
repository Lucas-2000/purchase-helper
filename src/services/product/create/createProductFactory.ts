import { PrismaProductsRepository } from "../../../repositories/prisma/prismaProductsRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { CreateProductController } from "./createProductController";
import { CreateProductService } from "./createProductService";

export const CreateProductFactory = () => {
  const productsRepository = new PrismaProductsRepository();
  const usersRepository = new PrismaUsersRepository();

  const createProductService = new CreateProductService(
    productsRepository,
    usersRepository
  );

  const createProductController = new CreateProductController(
    createProductService
  );

  return createProductController;
};
