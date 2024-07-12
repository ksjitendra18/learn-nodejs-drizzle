import { Request, Response } from "express";
import { db } from "../../db/setup";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

const updateUser = async (req: Request, res: Response) => {
  const { name, email }: { name: string; email: string } = req.body;
  const { userId } = req.params;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide user_id to update" });
    }
    if (!name && !email) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide field to update" });
    }
    if ((name && typeof name !== "string") || name.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "validation_error", message: "Name is required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      (email && typeof email !== "string") ||
      email.trim().length === 0 ||
      !emailRegex.test(email.trim())
    ) {
      return res
        .status(400)
        .json({ error: "validation_error", message: "Email is required" });
    }

    const updateData: { name?: string; email?: string } = {};

    if (name) {
      updateData.name = name.trim();
    }
    if (email) {
      updateData.email = email.trim();
    }
    await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, Number(userId)));
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log("Error while updating user", error);
    return res
      .status(500)
      .json({ error: "server_error", message: "Internal Server Error" });
  }
};

export default updateUser;
