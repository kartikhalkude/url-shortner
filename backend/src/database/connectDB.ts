import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";
import { connect } from "node:http2";

const connectDB = async () =>{
    await mongoose.connect(MONGO_URI)
    console.log("Mongo Connected");
}

export default connectDB