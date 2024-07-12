import { Request, Response } from "express";
import { db } from "../../db/setup";
import { users } from "../../db/schema";

const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await db.select().from(users);

    return res.status(200).json({ length: allUsers.length, data: allUsers });
  } catch (error) {
    console.log("Error while getting users", error);
    return res
      .status(500)
      .json({ error: "server_error", message: "Internal Server Error" });
  }
};

export default getUsers;
