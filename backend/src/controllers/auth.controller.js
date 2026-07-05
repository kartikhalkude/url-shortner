import { createUser } from "../services/auth.service.js";

export async function register(req, res, next) {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}
