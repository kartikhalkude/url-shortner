import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/profile", authMiddleware, (req, res) => {
  const user = req.user;
  res.json({
    user
  });
});

export default router;
