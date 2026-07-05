import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";
import { connect } from "node:http2";

const connectDB = async () =>{
    try{
        await mongoose.connect(MONGO_URI)
    console.log("Mongo Connected");
    }catch(error){
        console.log("Failed to Connect to Mongo");
        console.log(error);   
    }
}

export default connectDB