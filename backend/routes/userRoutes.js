import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
} from "../controllers/userController.js";
//auth middleware
import { protectRoute } from "../middleware/authMiddleware.js";

//top level route is /api/users

//create new user POST route
router.post("/", registerUser);
//login POST route -- email and PW
router.post("/login", authUser);
//GET user profile route --> ProtectedRoute MW: Id in token
router.get("/profile", protectRoute, getUserProfile);

export default router;
