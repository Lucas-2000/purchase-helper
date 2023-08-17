import { Request, Response } from "express";
import { GenerateResetPasswordService } from "./generateResetPasswordService";

export class GenerateResetPasswordController {
  constructor(
    private generateResetPasswordService: GenerateResetPasswordService
  ) {}

  async handle(req: Request, res: Response) {
    const { email } = req.body;

    const resetPassword = await this.generateResetPasswordService.execute({
      email,
    });

    return res.status(201).json(resetPassword);
  }
}
