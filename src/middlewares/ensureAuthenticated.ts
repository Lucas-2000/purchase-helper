import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { jwtSecret } from "../utils/config/jwt/jwtConfig";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) return res.status(401).json({ message: "Unauthorized" });

  const [, token] = authToken.split(" ");

  if (!jwtSecret) throw new Error("JWT Key not found!");

  try {
    verify(token, jwtSecret);

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
}
