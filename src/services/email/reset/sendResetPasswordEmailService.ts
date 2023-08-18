import { Email, EmailProps } from "../../../entities/email";
import { ResetPasswordRepository } from "../../../repositories/resetPasswordRepository";
import { UsersRepository } from "../../../repositories/usersRepository";
import { transporter } from "../../../utils/config/nodemailer/nodemailerConfig";

interface SendResetPasswordEmailRequest {
  email: string;
  body: string;
  subject: string;
}

type SendResetPasswordEmailResponse = EmailProps;

export class SendResetPasswordEmailService {
  constructor(
    private usersRepository: UsersRepository,
    private resetPasswordRepository: ResetPasswordRepository
  ) {}

  async execute({
    email,
    body,
    subject,
  }: SendResetPasswordEmailRequest): Promise<SendResetPasswordEmailResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error("User not found!");

    const tokenIsValid = await this.resetPasswordRepository.findByToken(body);

    if (!tokenIsValid) throw new Error("Invalid token!");

    const emailObj = new Email({
      email,
      body,
      subject,
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: emailObj.email,
      subject: emailObj.subject,
      text: `
        Olá ${user.username},
        \n
        segue o token para reset de senha: ${emailObj.body}
        \n
        Obs: o token tem validade de 24h.
      `,
    };

    await transporter.sendMail(mailOptions);

    return emailObj.getSummary();
  }
}
