import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import { verifyToken } from "../utils/verifyToken.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(401, "No Token Provided");
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (jwtError) {
      throw new AppError(401, jwtError.message || "Invalid Token");
    }

    if (!decoded || !decoded.id) {
      throw new AppError(401, "Invalid Token Format");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new AppError(401, "User Not Found");
    }
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
