import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
} from "../controllers/productController.js";

import { protectRoute, checkAdmin } from "../middleware/authMiddleware.js";
// @route   GET /api/products
router.get("/", getProducts);

// @route   GET /api/products/:id
router.get("/:id", getProductById);

// @route  DELETE /api/products/:id
router.delete("/:id", protectRoute, checkAdmin, deleteProduct);

export default router;
