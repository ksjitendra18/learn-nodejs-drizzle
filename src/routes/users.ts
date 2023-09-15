import { Router } from "express";

import createUser from "../controllers/users/createUser";
import getUsers from "../controllers/users/getUsers";
import getUser from "../controllers/users/getUser";
import updateUser from "../controllers/users/updateUser";
import deleteUser from "../controllers/users/deleteUser";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:userId", getUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
