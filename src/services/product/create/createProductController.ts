import { Request, Response } from "express";
import { CreateProductService } from "./createProductService";

export class CreateProductController {
  constructor(private createProductService: CreateProductService) {}

  async handle(req: Request, res: Response) {
    const {
      id,
      name,
      description,
      price,
      quantity,
      purchaseStart,
      purchaseFinish,
      userId,
    } = req.body;

    const product = await this.createProductService.execute({
      id,
      name,
      description,
      price,
      quantity,
      purchaseStart,
      purchaseFinish,
      userId,
    });

    return res.status(201).json(product);
  }
}
