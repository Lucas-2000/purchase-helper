import { Request, Response, Router } from "express";
import { CreateUserFactory } from "../services/user/create/createUserFactory";
import { FindAllUsersFactory } from "../services/user/findAll/findAllUsersFactory";

const userRoutes = Router();

userRoutes.post("/", (req: Request, res: Response) =>
  CreateUserFactory().handle(req, res)
);
userRoutes.get("/", (req: Request, res: Response) =>
  FindAllUsersFactory().handle(req, res)
);

export { userRoutes };
