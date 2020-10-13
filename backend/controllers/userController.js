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
      token: generateToken(user._id),
    });
  } else {
    // if user not found or invalid password
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export { authUser };
