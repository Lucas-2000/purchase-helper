import {
  ResetPassword,
  ResetPasswordProps,
} from "./../../../entities/resetPassword";
import { UsersRepository } from "./../../../repositories/usersRepository";
import { ResetPasswordRepository } from "../../../repositories/resetPasswordRepository";
import { randomUUID } from "node:crypto";
import { GenerateExpiresDate } from "../../../utils/dates/generateExpiresDate";
import { GenerateRandomToken } from "../../../utils/strings/generateRandomToken";

interface ResetPasswordRequest {
  email: string;
}

type ResetPasswordResponse = ResetPasswordProps;

export class GenerateResetPasswordService {
  constructor(
    private resetPasswordRepository: ResetPasswordRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    email,
  }: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error("User not found");

    const userId = user.id as string;

    const index = await this.resetPasswordRepository.findIndex(userId);

    if (index >= 0) await this.resetPasswordRepository.delete(userId);

    const resetPassword = new ResetPassword({
      id: randomUUID(),
      token: GenerateRandomToken(10),
      expiresAt: GenerateExpiresDate(),
      userId,
    });

    await this.resetPasswordRepository.generate(resetPassword);

    return resetPassword.getSummary();
  }
}
