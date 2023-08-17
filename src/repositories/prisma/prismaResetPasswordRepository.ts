import { ResetPassword } from "../../entities/resetPassword";
import { prisma } from "../../utils/config/prisma/prismaClient";
import { ResetPasswordRepository } from "../resetPasswordRepository";

export class PrismaResetPasswordRepository implements ResetPasswordRepository {
  async generate({
    id,
    token,
    expiresAt,
    userId,
  }: ResetPassword): Promise<void> {
    await prisma.resetPassword.create({
      data: {
        id,
        token,
        expiresAt,
        userId,
      },
    });
  }

  async findByToken(token: string): Promise<ResetPassword | undefined> {
    const resetPassword = await prisma.resetPassword.findUnique({
      where: {
        token,
      },
    });

    if (!resetPassword) return;

    return new ResetPassword({
      id: resetPassword.id,
      token: resetPassword.token,
      expiresAt: resetPassword.expiresAt,
      userId: resetPassword.userId,
    });
  }

  async findIndex(userId: string): Promise<number> {
    const resetPassword = await prisma.resetPassword.findMany();
    const userIndex = resetPassword.findIndex((r) => r.userId === userId);

    if (userIndex < 0) return -1;

    return userIndex;
  }

  async delete(userId: string): Promise<void> {
    const resetId = await prisma.resetPassword.findFirst({
      where: {
        userId: userId,
      },
    });

    await prisma.resetPassword.delete({
      where: { id: resetId?.id },
    });
  }
}
