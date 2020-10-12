import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//controller for public route  GET /api/products -- gets all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  //return all products
  res.json(products);
});

//controller for public route  GET /api/products -- returns single product by _objectID
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById };
