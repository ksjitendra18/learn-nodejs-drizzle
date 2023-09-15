import { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
};

export default getUser;
