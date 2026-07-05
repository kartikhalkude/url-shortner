import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Mongo Connected");
  } catch (error) {
    console.error("Failed to Connect to Mongo");
    console.error(error);
  }
};

export default connectDB;
