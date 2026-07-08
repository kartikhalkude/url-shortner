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
import {
  createUrlValidator,
  updateUrlValidator,
} from "../validators/url.validators.js";
import { validate } from "../middlewares/validation.middleware.js";
const router = express.Router();

router.post("/", authMiddleware, createUrlValidator, validate, createUrl);
router.get("/", authMiddleware, getUserUrls);
router.delete("/:id", authMiddleware, deleteUsersUrl);
router.put("/:id", authMiddleware, updateUrlValidator, validate, updateUserURL);
router.get("/:shortId", getUrlAnalytics);
export default router;
