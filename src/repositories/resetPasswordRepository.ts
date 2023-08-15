import { ResetPassword } from "../entities/resetPassword";

export interface ResetPasswordRepository {
  generate(resetPassword: ResetPassword): Promise<void>;
  findIndex(userId: string): Promise<number>;
  delete(userId: string): Promise<void>;
  findByToken(token: string): Promise<ResetPassword | undefined>;
}
