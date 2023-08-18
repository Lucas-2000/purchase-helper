import { Request, Response, Router } from "express";
import { CreateProductFactory } from "../services/product/create/createProductFactory";

const productRoutes = Router();

productRoutes.post("/", (req: Request, res: Response) =>
  CreateProductFactory().handle(req, res)
);

export { productRoutes };
