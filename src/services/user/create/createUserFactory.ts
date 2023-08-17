import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { CreateUserController } from "./createUserController";
import { CreateUserService } from "./createUserService";

export const CreateUserFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const createUserService = new CreateUserService(usersRepository);
  const createUserController = new CreateUserController(createUserService);

  return createUserController;
};
