import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

// Middleware for verifying JWT token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  

  if (!authHeader) {
    console.warn("Unauthorized: No Token Provided");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

  const token = authHeader.slice(7);

  jwt.verify(
    token,
    config.server.token.accessSecret,
    (err: any, decoded: any) => {
      if (err) {
        console.error(err.message);
        return res.status(401).json({ message: "Unauthorized: Token expired" });
      }
      req.body.user = decoded.user; // Attach user data to the request for later use
      next();
    },
  );
};

export default verifyToken;
