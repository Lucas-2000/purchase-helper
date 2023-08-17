import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { DeleteUserController } from "./deleteUserController";
import { DeleteUserService } from "./deleteUserService";

export const DeleteUserFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const deleteUserService = new DeleteUserService(usersRepository);
  const deleteUserController = new DeleteUserController(deleteUserService);

  return deleteUserController;
};
