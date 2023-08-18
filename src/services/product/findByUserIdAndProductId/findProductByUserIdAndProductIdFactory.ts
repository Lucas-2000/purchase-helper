import { PrismaProductsRepository } from "../../../repositories/prisma/prismaProductsRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { FindProductByUserIdAndProductIdController } from "./findProductByUserIdAndProductIdController";
import { FindProductByUserIdAndProductIdService } from "./findProductByUserIdAndProductIdService";

export const FindProductByUserIdAndProductIdFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const productsRepository = new PrismaProductsRepository();

  const findProductByUserIdAndProductIdService =
    new FindProductByUserIdAndProductIdService(
      productsRepository,
      usersRepository
    );

  const findProductByUserIdAndProductIdController =
    new FindProductByUserIdAndProductIdController(
      findProductByUserIdAndProductIdService
    );

  return findProductByUserIdAndProductIdController;
};
