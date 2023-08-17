import { Request, Response } from "express";
import { DeleteUserService } from "./deleteUserService";
export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const user = await this.deleteUserService.execute({ id });

    return res.status(201).json(user);
  }
}
