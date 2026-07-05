import app from "./app.js";
import { PORT } from "./config/env.js";
import connectDB from "./database/connectDB.js";

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
}

startServer();
