import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//controller for public route  GET /api/products -- gets all products
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  // url query will have the page number
  const page = Number(req.query.pageNumber) || 1;

  //req.query pulls the querysrting from the URL
  const keyword = req.query.keyword
    ? {
        //use regex to avoid having to type direct search term
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  //.count mongoose method is deprecitaed
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize) //limit db query by page size
    .skip(pageSize * (page - 1)); //gets the correct amount of products from the correct place (1st 10 prods, 2nd 10 products etc)

  //return all products or optional: all products matching keyword
  //round up the page and the pages(amount of total pages total queries/pagesize)
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// Controller for public route  GET /api/products -- gets single product by _objectID
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Controller for DELETE /api/products/:id --> allows to any admin to delete any product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  //no need for req.user._id = product.user._id because any admin can delete a product, not the product creator admin.
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Controller for  POST /api/products -->  admin Create a product
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Controller for PUT /api/products/:id --> admin update a product
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  //replace the current product info with the form data comin from req.body
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Controller for POST /api/products/:id/reviews  --> Create new review for a product
const createProductReview = asyncHandler(async (req, res) => {
  //req.body wil have rating (0-5 NUM) and comment
  const { rating, comment } = req.body;
  //get product id for review from request
  const product = await Product.findById(req.params.id);

  //if product found in DB, check if userID has already reviewed the productID which we found above - Product.findById(req.params.id);
  if (product) {
    //if the product review has the same user as the user thats sending our server a review of that product then alreadyReviewed is true
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    //if user already reviewed
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    //if alreadyReviewed is not true, create a new review for that user , and push that into the products review array

    const userReview = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment.toString(),
      user: req.user._id,
    };

    product.reviews.push(userReview);

    product.numReviews = product.reviews.length;

    //each review schema has an indiviual rating

    //get total ratings and save value to product.rating property
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    //now save the product model again with the rewviews:[reviewSchema] field updated
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Controller for -  GET /api/products/top --> gets top 3 rated products PUBLIC
const getTopProducts = asyncHandler(async (req, res) => {
  //get all products, sort by rating in ascending order, and limit 3 queries for top 3 products
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
