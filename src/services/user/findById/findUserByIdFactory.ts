import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { FindUserByIdController } from "./findUserByIdController";
import { FindUserByIdService } from "./findUserByIdService";

export const FindUserByIdFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const findUserByIdService = new FindUserByIdService(usersRepository);
  const findUserByIdController = new FindUserByIdController(
    findUserByIdService
  );

  return findUserByIdController;
};
