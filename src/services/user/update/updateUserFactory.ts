import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { UpdateUserController } from "./updateUserController";
import { UpdateUserService } from "./updateUserService";

export const UpdateUserFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const updateUserService = new UpdateUserService(usersRepository);
  const updateUserController = new UpdateUserController(updateUserService);

  return updateUserController;
};
