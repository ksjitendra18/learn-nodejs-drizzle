import { Request, Response } from "express";

const updateUser = async (req: Request, res: Response) => {
  const { name, email }: { name: string; email: string } = req.body;
  const { userId } = req.params;

  if (!name && !email) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Please provide fields to update",
    });
  }
};

export default updateUser;
