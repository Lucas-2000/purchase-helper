import { Request, Response } from "express";
import { SendResetPasswordEmailService } from "./sendResetPasswordEmailService";

export class SendResetPasswordEmailController {
  constructor(
    private sendResetPasswordEmailService: SendResetPasswordEmailService
  ) {}

  async handle(req: Request, res: Response) {
    const { email, token, subject } = req.body;

    const sendEmail = await this.sendResetPasswordEmailService.execute({
      email,
      token,
      subject,
    });

    return res.status(201).json(sendEmail);
  }
}
