import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
//import middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
//import routes
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(express.json());

//routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/uploads", uploadRoutes);
//PAYPAL CLIENT ROUTE
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//static uploads folder
//__dirname not available if using ES6 imports with node.js
//creating a variable that will point to the same thing
const dirname_sub = path.resolve();
app.use("/uploads", express.static(path.join(dirname_sub, "/uploads")));

//middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running on ${process.env.NODE_ENV} mode on localhost:${PORT}`.blue
      .bold
  )
);
