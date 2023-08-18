import { Request, Response } from "express";
import { UpdateProductService } from "./updateProductService";

export class UpdateProductController {
  constructor(private updateProductService: UpdateProductService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      quantity,
      purchaseStart,
      purchaseFinish,
      userId,
    } = req.body;

    const product = await this.updateProductService.execute({
      id,
      name,
      description,
      price,
      quantity,
      purchaseStart,
      purchaseFinish,
      userId,
    });

    res.status(201).json(product);
  }
}
