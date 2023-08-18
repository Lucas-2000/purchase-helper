import { Request, Response, Router } from "express";
import { CreateProductFactory } from "../services/product/create/createProductFactory";
import { FindAllProductsFactory } from "../services/product/findAll/findAllProductsFactory";
import { FindProductByUserIdAndProductIdFactory } from "../services/product/findByUserIdAndProductId/findProductByUserIdAndProductIdFactory";
import { UpdateProductFactory } from "../services/product/update/updateProductFactory";

const productRoutes = Router();

productRoutes.post("/", (req: Request, res: Response) =>
  CreateProductFactory().handle(req, res)
);
productRoutes.get("/", (req: Request, res: Response) =>
  FindAllProductsFactory().handle(req, res)
);
productRoutes.get("/:productId/:userId", (req: Request, res: Response) =>
  FindProductByUserIdAndProductIdFactory().handle(req, res)
);
productRoutes.put("/:id", (req: Request, res: Response) =>
  UpdateProductFactory().handle(req, res)
);

export { productRoutes };
