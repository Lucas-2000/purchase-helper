import { Request, Response } from "express";
import { UpdateUserService } from "./updateUserService";

export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { username, email, password, type } = req.body;

    const user = await this.updateUserService.execute({
      id,
      username,
      email,
      password,
      type,
    });

    return res.status(201).json(user);
  }
}
