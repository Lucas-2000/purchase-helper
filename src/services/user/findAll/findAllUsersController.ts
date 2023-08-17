import { Request, Response } from "express";
import { FindAllUsersService } from "./findAllUsersService";

export class FindAllUsersController {
  constructor(private findAllUsersService: FindAllUsersService) {}

  async handle(req: Request, res: Response) {
    const user = await this.findAllUsersService.execute();

    return res.status(201).json(user);
  }
}
