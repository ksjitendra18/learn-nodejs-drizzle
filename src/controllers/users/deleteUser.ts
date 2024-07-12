import { Request, Response } from "express";
import { db } from "../../db/setup";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(400)
      .json({ error: "missing_parameter", message: "userId is required" });
  }

  try {
    await db.delete(users).where(eq(users.id, Number(userId)));
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error while deleting user", error);
    return res
      .status(500)
      .json({ error: "server_error", message: "Internal Server Error" });
  }
};

export default deleteUser;
