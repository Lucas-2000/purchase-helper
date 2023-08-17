import { PrismaResetPasswordRepository } from "../../../repositories/prisma/prismaResetPasswordRepository";
import { FindByTokenResetPasswordController } from "./findByTokenResetPasswordController";
import { FindByTokenResetPasswordService } from "./findByTokenResetPasswordService";

export const FindByTokenResetPasswordFactory = () => {
  const resetPasswordRepository = new PrismaResetPasswordRepository();
  const findByTokenResetPasswordService = new FindByTokenResetPasswordService(
    resetPasswordRepository
  );
  const findByTokenResetPasswordController =
    new FindByTokenResetPasswordController(findByTokenResetPasswordService);

  return findByTokenResetPasswordController;
};
