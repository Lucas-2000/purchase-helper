import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { AuthUserController } from "./authUserController";
import { AuthUserService } from "./authUserService";

export const AuthUserFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const authUserService = new AuthUserService(usersRepository);
  const authUserController = new AuthUserController(authUserService);

  return authUserController;
};
