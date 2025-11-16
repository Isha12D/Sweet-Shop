import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request to include custom field
declare global {
  namespace Express {
    interface Request {
      admin?: any;
    }
  }
}

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "SECRET_KEY") as {
      id: string;
      role: string;
    };

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    req.admin = decoded; // Now TypeScript won't complain
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
