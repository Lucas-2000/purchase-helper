import { Request, Response } from "express";
import { AuthUserService } from "./authUserService";

export class AuthUserController {
  constructor(private authService: AuthUserService) {}

  async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await this.authService.execute({
      username,
      password,
    });

    return res.status(201).json(user);
  }
}
