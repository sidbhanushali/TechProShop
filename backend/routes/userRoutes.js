import express from "express";
const router = express.Router();
import { authUser, getUserProfile } from "../controllers/userController.js";
//auth middleware
import { protectRoute } from "../middleware/authMiddleware.js";

//top level route is /api/users
router.post("/login", authUser);

router.get("/profile", protectRoute, getUserProfile);

export default router;
