import express from "express";
const router = express.Router();
import { addOrderItems, getOrderById } from "../controllers/orderController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

//TOP LEVEL ROUTE IS /api/orders

//POST route for /api/orders --> create new order
router.post("/", protectRoute, addOrderItems);

//GET route for /api/orders/:id --> create new order
router.get("/:id", protectRoute, getOrderById);

export default router;
