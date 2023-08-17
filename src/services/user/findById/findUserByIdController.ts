import { Request, Response } from "express";
import { FindUserByIdService } from "./findUserByIdService";

export class FindUserByIdController {
  constructor(private findUserByIdService: FindUserByIdService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const user = await this.findUserByIdService.execute({ id });

    return res.status(201).json(user);
  }
}
