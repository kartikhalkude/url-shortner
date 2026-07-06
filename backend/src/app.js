import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/url.routes.js";
import { redirectUrl } from "./controllers/url.controller.js";

import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", authRoutes);
app.use("/api/urls", urlRoutes);
app.get("/:shortId", redirectUrl);
app.use(errorMiddleware);

export default app;
