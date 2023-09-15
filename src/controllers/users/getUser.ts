import { Request, Response } from "express";
import { db } from "../../db/setup";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userById = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(userId)));

    return res.status(200).json({ success: true, data: userById });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: "Unable to get users" });
  }
};

export default getUser;
