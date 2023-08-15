import { ResetPassword } from "./../../entities/resetPassword";
import { ResetPasswordRepository } from "../resetPasswordRepository";

export class InMemoryResetPasswordRepository
  implements ResetPasswordRepository
{
  public resetPassword: ResetPassword[] = [];

  async generate(resetPassword: ResetPassword): Promise<void> {
    this.resetPassword.push(resetPassword);
  }

  async findIndex(userId: string): Promise<number> {
    const index = this.resetPassword.findIndex((r) => r.userId === userId);

    if (index < 0) return -1;

    return index;
  }

  async delete(userId: string): Promise<void> {
    const userIndex = this.resetPassword.findIndex(
      (obj) => obj.userId === userId
    );

    if (userIndex !== -1) {
      this.resetPassword.splice(userIndex, 1);
    }
  }

  async findByToken(token: string): Promise<ResetPassword | undefined> {
    const resetPassword = this.resetPassword.find((obj) => obj.token === token);

    return resetPassword;
  }
}
