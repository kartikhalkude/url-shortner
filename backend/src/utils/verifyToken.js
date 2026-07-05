import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
