import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export async function createUser(data) {
  const { username, email, password } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(409, "Email already exists");
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedpassword,
  });
  user.password = undefined;
  return user;
}

export async function loginUser(data) {
  const { email, password } = data;
  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser) {
    throw new AppError(401, "Invalid User and Password");
  }
  const ismatch = await bcrypt.compare(password, existingUser.password);

  if (ismatch) {
    const token = generateToken(existingUser._id);
    existingUser.password = undefined;
    return { message: "Logged In", token };
  } else {
    throw new AppError(401, "Invalid User and Password");
  }
}
