/**
 * @license apache-2.0/mit
 * @copyright vladiere
 * */

'use strict';

import jwt from "jsonwebtoken";
import config from "../config/app.config.js";

// Middleware for verifying JWT token
const verifyToken = (req, res, next) => {
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
    (err, decoded) => {
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
