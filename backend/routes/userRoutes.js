import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
//auth middleware
import { protectRoute, checkAdmin } from "../middleware/authMiddleware.js";

//top level route is /api/users

//create new user POST route
router.post("/", registerUser);
//login POST route -- email & PW
router.post("/login", authUser);

//GET user profile route --> ProtectedRoute MW: Id in token
router.get("/profile", protectRoute, getUserProfile);
//PUT update user profile route --> ProtectedRoute MW: Id in token
router.put("/profile", protectRoute, updateUserProfile);

//GET ROUTE for get all users --> PROTECT ROUTE &ADMINS ONLY
router.get("/", protectRoute, checkAdmin, getUsers);

//DELETE ROUTE to yeet a user --> PROTECT ROUTE &ADMINS ONLY
router.delete("/:id", protectRoute, checkAdmin, deleteUser);

//GET ROUTE getUserById
router.get("/:id", protectRoute, checkAdmin, getUserById);

//PUT ROUTE update UserById
router.put("/:id", protectRoute, checkAdmin, updateUserById);

export default router;
