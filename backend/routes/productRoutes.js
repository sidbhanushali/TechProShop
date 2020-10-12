import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

// @route   GET /api/products
router.get("/", getProducts);

// @route   GET /api/products/:id
router.get("/:id", getProductById);

export default router;
