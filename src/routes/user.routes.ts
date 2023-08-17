import { Request, Response, Router } from "express";
import { CreateUserFactory } from "../services/user/create/createUserFactory";
import { FindAllUsersFactory } from "../services/user/findAll/findAllUsersFactory";
import { FindUserByIdFactory } from "../services/user/findById/findUserByIdFactory";

const userRoutes = Router();

userRoutes.post("/", (req: Request, res: Response) =>
  CreateUserFactory().handle(req, res)
);
userRoutes.get("/", (req: Request, res: Response) =>
  FindAllUsersFactory().handle(req, res)
);
userRoutes.get("/:id", (req: Request, res: Response) =>
  FindUserByIdFactory().handle(req, res)
);

export { userRoutes };
