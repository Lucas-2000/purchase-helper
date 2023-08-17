import { Request, Response, Router } from "express";
import { CreateUserFactory } from "../services/user/create/createUserFactory";
import { FindAllUsersFactory } from "../services/user/findAll/findAllUsersFactory";
import { FindUserByIdFactory } from "../services/user/findById/findUserByIdFactory";
import { UpdateUserFactory } from "../services/user/update/updateUserFactory";
import { DeleteUserFactory } from "../services/user/delete/deleteUserFactory";
import { AuthUserFactory } from "../services/user/auth/authUserFactory";
import { GenerateResetPasswordFactory } from "../services/resetPassword/generate/generateResetPasswordFactory";
import { FindByTokenResetPasswordFactory } from "../services/resetPassword/findByToken/findByTokenResetPasswordFactory";
import { SendResetPasswordEmailFactory } from "../services/email/reset/sendResetPasswordEmailFactory";

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
userRoutes.put("/:id", (req: Request, res: Response) =>
  UpdateUserFactory().handle(req, res)
);
userRoutes.delete("/:id", (req: Request, res: Response) =>
  DeleteUserFactory().handle(req, res)
);
userRoutes.post("/login", (req: Request, res: Response) =>
  AuthUserFactory().handle(req, res)
);
userRoutes.post("/reset-password", (req: Request, res: Response) =>
  GenerateResetPasswordFactory().handle(req, res)
);
userRoutes.get("/reset-password/:token", (req: Request, res: Response) =>
  FindByTokenResetPasswordFactory().handle(req, res)
);
userRoutes.post("/reset-password/send", (req: Request, res: Response) =>
  SendResetPasswordEmailFactory().handle(req, res)
);

export { userRoutes };
