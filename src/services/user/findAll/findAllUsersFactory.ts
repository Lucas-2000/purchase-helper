import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { FindAllUsersController } from "./findAllUsersController";
import { FindAllUsersService } from "./findAllUsersService";

export const FindAllUsersFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const findAllUsersService = new FindAllUsersService(usersRepository);
  const findAllUsersController = new FindAllUsersController(
    findAllUsersService
  );

  return findAllUsersController;
};
