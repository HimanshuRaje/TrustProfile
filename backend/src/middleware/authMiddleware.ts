// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define what our JWT payload looks like
interface UserPayload extends JwtPayload {
  id: string;
  role: "admin" | "user";
  username: string;
}

// Locally extend the Express Request for this file
export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing from Authorization header" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET not configured");
    }

    const decoded = jwt.verify(token, secret) as UserPayload;
    req.user = decoded; // ✅ Works locally without global declaration
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
