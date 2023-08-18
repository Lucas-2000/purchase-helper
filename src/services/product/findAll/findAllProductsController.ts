import { Request, Response } from "express";
import { FindAllProductsService } from "./findAllProductsService";

export class FindAllProductsController {
  constructor(private findAllProductsService: FindAllProductsService) {}

  async handle(req: Request, res: Response) {
    const products = await this.findAllProductsService.execute();

    return res.status(201).json(products);
  }
}
