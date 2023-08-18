import { Request, Response } from "express";
import { DeleteProductService } from "./deleteProductService";

export class DeleteProductController {
  constructor(private deleteProductService: DeleteProductService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const product = await this.deleteProductService.execute({ id });

    return res.status(201).json(product);
  }
}
