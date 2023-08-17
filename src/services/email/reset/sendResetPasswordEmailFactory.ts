import { PrismaResetPasswordRepository } from "../../../repositories/prisma/prismaResetPasswordRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { SendResetPasswordEmailController } from "./sendResetPasswordEmailController";
import { SendResetPasswordEmailService } from "./sendResetPasswordEmailService";

export const SendResetPasswordEmailFactory = () => {
  const resetPasswordRepository = new PrismaResetPasswordRepository();
  const usersRepository = new PrismaUsersRepository();
  const sendResetPasswordEmailService = new SendResetPasswordEmailService(
    usersRepository,
    resetPasswordRepository
  );
  const sendResetPasswordEmailController = new SendResetPasswordEmailController(
    sendResetPasswordEmailService
  );

  return sendResetPasswordEmailController;
};
