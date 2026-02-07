import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("RouteToken->:", req.cookies);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = User.findById(decoded.userId).select(-password);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protestRoute middleware", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
