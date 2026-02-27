import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(400).json({
      message: "Not authorised, token missing",
    });
  }

  const jwtToken = process.env.JWT_SECRET;

  if (!jwtToken) {
    throw new Error("JWT_SECRET not defined");
  }

  try {
    const decoded = jwt.verify(token, jwtToken) as { id: string };
    req.user = decoded;
    next();
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message,
    });
  }
};
