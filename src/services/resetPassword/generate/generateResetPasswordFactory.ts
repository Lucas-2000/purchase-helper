import { PrismaResetPasswordRepository } from "../../../repositories/prisma/prismaResetPasswordRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { GenerateResetPasswordController } from "./generateResetPasswordController";
import { GenerateResetPasswordService } from "./generateResetPasswordService";

export const GenerateResetPasswordFactory = () => {
  const resetPasswordRepository = new PrismaResetPasswordRepository();
  const usersRepository = new PrismaUsersRepository();
  const generateResetPasswordService = new GenerateResetPasswordService(
    resetPasswordRepository,
    usersRepository
  );
  const generateResetPasswordController = new GenerateResetPasswordController(
    generateResetPasswordService
  );

  return generateResetPasswordController;
};
