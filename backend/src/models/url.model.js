import mongoose, { mongo, trusted } from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    customAlais: {
      type: String,
      unique: true,
      sparse: true, //allows null values
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
