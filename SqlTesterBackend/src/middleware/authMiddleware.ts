import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {

  const token = req.cookies?.accessToken;

  console.log("Cookie token:", token);

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
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message,
    });
  }
};
