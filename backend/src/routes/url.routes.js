import express from "express";
import {
  createUrl,
  updateUserURL,
  deleteUsersUrl,
  getUserUrls,
  redirectUrl,
  getUrlAnalytics,
} from "../controllers/url.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/", authMiddleware, createUrl);
router.get("/", authMiddleware, getUserUrls);
router.delete("/:id", authMiddleware, deleteUsersUrl);
router.put("/:id", authMiddleware, updateUserURL);
router.get("/:shortId",getUrlAnalytics)
export default router;
