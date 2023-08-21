import { Request, Response } from "express";
import { FindProductByUserIdService } from "./findProductByUserIdService";

export class FindProductByUserIdController {
  constructor(private findProductByUserIdService: FindProductByUserIdService) {}

  async handle(req: Request, res: Response) {
    const { userId } = req.params;

    const products = await this.findProductByUserIdService.execute({ userId });

    return res.status(201).json(products);
  }
}
