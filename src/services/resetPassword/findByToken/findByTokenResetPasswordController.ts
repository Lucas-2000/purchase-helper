import { Request, Response } from "express";
import { FindByTokenResetPasswordService } from "./findByTokenResetPasswordService";

export class FindByTokenResetPasswordController {
  constructor(
    private findByTokenResetPasswordService: FindByTokenResetPasswordService
  ) {}

  async handle(req: Request, res: Response) {
    const { token } = req.params;

    const resetPassword = await this.findByTokenResetPasswordService.execute({
      token,
    });

    return res.status(201).json(resetPassword);
  }
}
