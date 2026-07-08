import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import { validate } from "../middlewares/validation.middleware.js";
const router = express.Router();

router.post("/auth/register", registerValidator, validate, register);
router.post("/auth/login", loginValidator, validate, login);

router.get("/profile", authMiddleware, (req, res) => {
  const user = req.user;
  res.json({
    user,
  });
});

export default router;
