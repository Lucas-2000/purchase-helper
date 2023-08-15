import { ResetPasswordProps } from "../../../entities/resetPassword";
import { ResetPasswordRepository } from "../../../repositories/resetPasswordRepository";

interface FindByTokenResetPasswordRequest {
  token: string;
}

type FindByTokenResetPasswordResponse = ResetPasswordProps;

export class FindByTokenResetPasswordService {
  constructor(private resetPasswordRepository: ResetPasswordRepository) {}

  async execute({
    token,
  }: FindByTokenResetPasswordRequest): Promise<FindByTokenResetPasswordResponse> {
    const passwordReset = await this.resetPasswordRepository.findByToken(token);

    if (!passwordReset) throw new Error("Token not found");

    return passwordReset.getSummary();
  }
}
