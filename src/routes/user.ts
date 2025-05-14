import express from "express";
import { createUser, deleteUser, getUser, updateUser } from "../controllers/user.ts";

const router = express.Router();


router.get("/:id", getUser)

router.post("/", createUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);


export default router;

