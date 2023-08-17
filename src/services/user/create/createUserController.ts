import { Request, Response } from "express";
import { CreateUserService } from "./createUserService";

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  async handle(req: Request, res: Response) {
    const { username, email, password, type } = req.body;

    const user = await this.createUserService.execute({
      username,
      email,
      password,
      type,
    });

    return res.status(201).json(user);
  }
}
