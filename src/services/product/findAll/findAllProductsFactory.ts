import { PrismaProductsRepository } from "../../../repositories/prisma/prismaProductsRepository";
import { FindAllProductsController } from "./findAllProductsController";
import { FindAllProductsService } from "./findAllProductsService";

export const FindAllProductsFactory = () => {
  const productsRepository = new PrismaProductsRepository();
  const findAllProductsService = new FindAllProductsService(productsRepository);
  const findAllProductsController = new FindAllProductsController(
    findAllProductsService
  );

  return findAllProductsController;
};
