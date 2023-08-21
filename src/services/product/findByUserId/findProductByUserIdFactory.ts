import { PrismaProductsRepository } from "../../../repositories/prisma/prismaProductsRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { FindProductByUserIdController } from "./findProductByUserIdController";
import { FindProductByUserIdService } from "./findProductByUserIdService";

export const FindProductByUserIdFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const productsRepository = new PrismaProductsRepository();

  const findProductByUserIdService = new FindProductByUserIdService(
    productsRepository,
    usersRepository
  );

  const findProductByUserIdController = new FindProductByUserIdController(
    findProductByUserIdService
  );

  return findProductByUserIdController;
};
