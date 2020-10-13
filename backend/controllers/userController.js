import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//controller for POST /api/users/login --> auths the user & gets tokenc
const authUser = asyncHandler(async (req, res) => {
  //auth users email password
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // .matchPassword is a User Schema method
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      //pass user ID as part of JWT payload
      token: generateToken(user._id),
    });
  } else {
    // if user not found or invalid password
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//controller for GET api/users/profile PRIVATE ROUTE
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, getUserProfile };
