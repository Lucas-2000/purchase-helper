import { Request, Response } from "express";
import { FindProductByUserIdAndProductIdService } from "./findProductByUserIdAndProductIdService";

export class FindProductByUserIdAndProductIdController {
  constructor(
    private findProductByUserIdAndProductIdService: FindProductByUserIdAndProductIdService
  ) {}

  async handle(req: Request, res: Response) {
    const { productId, userId } = req.params;

    const product = await this.findProductByUserIdAndProductIdService.execute({
      userId,
      productId,
    });

    res.status(201).json(product);
  }
}
