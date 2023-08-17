import { Request, Response, Router } from "express";
import { CreateUserFactory } from "../services/user/create/createUserFactory";

const userRoutes = Router();

userRoutes.post("/", (req: Request, res: Response) =>
  CreateUserFactory().handle(req, res)
);

export { userRoutes };
