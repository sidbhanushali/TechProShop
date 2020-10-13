import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//custom authentication Middleware

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  //this is accessing the bearer token we send with postman/frontend -- make sure it starts with bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //assign token vat to token string get from headers drop the "Bearer "
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // if theres no token in the headers
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protectRoute };
