import express from "express";
const router = express.Router();
import { authUser } from "../controllers/userController.js";

//top level route is /api/users
router.post("/login", authUser);

export default router;
