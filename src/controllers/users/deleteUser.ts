import { Request, Response } from "express";

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
};

export default deleteUser;
