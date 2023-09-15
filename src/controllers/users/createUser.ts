import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
  const { name, email }: { name: string; email: string } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "Name is required" });
  }

  if (!email) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "Email is required" });
  }
};

export default createUser;
