import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";
import { protectRoute, checkAdmin } from "../middleware/authMiddleware.js";

//TOP LEVEL ROUTE IS /api/orders

//POST route for /api/orders --> create new order
router.post("/", protectRoute, addOrderItems);

//GET route for /api/orders/myorders --> gets all order objs for logged in user @profile page
router.get("/myorders", protectRoute, getMyOrders);

//GET route for /api/orders/:id --> create new order
router.get("/:id", protectRoute, getOrderById);

//PUT route for /api/orders/:id/pay --> for admin to update order status
router.put("/:id/pay", protectRoute, updateOrderToPaid);

//GET route for /api/orders --> admin order list get all orders
router.get("/", protectRoute, checkAdmin, getOrders);

export default router;
