import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";

import { protectRoute, checkAdmin } from "../middleware/authMiddleware.js";
// @route   GET /api/products
router.get("/", getProducts);

// @route   GET /api/products/:id
router.get("/:id", getProductById);

// @route  DELETE /api/products/:id -- ADMIN ROUTE
router.delete("/:id", protectRoute, checkAdmin, deleteProduct);

//@route POST /api/products --> only admins can create products
router.post("/", protectRoute, checkAdmin, createProduct);

//@route PUT /api/products/:id --> only admins can update products
router.put("/:id", protectRoute, checkAdmin, updateProduct);

export default router;
