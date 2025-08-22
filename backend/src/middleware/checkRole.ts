import { Response, NextFunction } from "express";
import { User, Log } from "../models/authModels";
import { AuthenticatedRequest } from "./authMiddleware"; // ✅ import local type

export const checkRole = (requiredRole: "admin" | "user", verifyFromDB = false) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => { // ✅ use it here
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      let roleToCheck = req.user.role;

      if (verifyFromDB) {
        const user = await User.findById(req.user.id).select("role username");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        roleToCheck = user.role;
      }

      if (roleToCheck !== requiredRole) {
        await Log.create({
          userId: req.user.id,
          action: `Unauthorized role access attempt`,
          details: `Required: ${requiredRole}, Found: ${roleToCheck}`,
          status: "failed"
        });

        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      console.error("Role check error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
};
