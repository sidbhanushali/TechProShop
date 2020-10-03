const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const products = require("./data/products");

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running on ${process.env.NODE_ENV} mode on localhost:${PORT}`
  )
);
