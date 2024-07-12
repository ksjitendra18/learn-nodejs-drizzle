import { Request, Response } from "express";
import { users } from "../../db/schema";
import { db } from "../../db/setup";

const createUser = async (req: Request, res: Response) => {
  const { name, email }: { name: string; email: string } = req.body;

  // basic validation
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "validation_error", message: "Name is required" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      error: "validation_error",
      message: "Email is missing or invalid",
    });
  }

  try {
    await db.insert(users).values({ name: name.trim(), email: email.trim() });

    return res.status(201).json({
      message: "User added successfully",
    });
  } catch (error) {
    console.log("Error while creating user", error);
    return res
      .status(500)
      .json({ error: "server_error", message: "Unable to add" });
  }
};

export default createUser;
