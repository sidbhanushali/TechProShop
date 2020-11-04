import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";

import { protectRoute, checkAdmin } from "../middleware/authMiddleware.js";
// @route   GET /api/products
router.get("/", getProducts);

//route for POST /api/products/:id/reviews --> THIS NEEDS TO BE LOADED FIRST BC IT IS A DEPENDENCY FOR THE PRODUCT CAROUSEL WHICH NEEDS THE REVEIWS TO LOAD PROPERLY
router.post("/:id/reviews", protectRoute, createProductReview);

//@route GET /api/products/top --> returns top 3 products sorted by reviews
router.get("/top", getTopProducts);

// @route   GET /api/products/:id
router.get("/:id", getProductById);

// @route  DELETE /api/products/:id -- ADMIN ROUTE
router.delete("/:id", protectRoute, checkAdmin, deleteProduct);

//@route POST /api/products --> only admins can create products
router.post("/", protectRoute, checkAdmin, createProduct);

//@route PUT /api/products/:id -->only admins can update products
router.put("/:id", protectRoute, checkAdmin, updateProduct);

export default router;
