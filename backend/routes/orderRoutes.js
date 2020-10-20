import express from "express";
const router = express.Router();
import { addOrderItems } from "../controllers/orderController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

//POST route for /api/orders --> create new order
router.post("/", protectRoute, addOrderItems);

export default router;
