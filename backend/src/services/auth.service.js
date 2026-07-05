import User from "../models/user.model.js";

export async function createUser({ username, email, password }) {
  const newUser = await User.create({
    username,
    email,
    password,
  });

  return newUser;
}
