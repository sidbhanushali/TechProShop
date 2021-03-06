import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//controller for POST /api/users/login --> auths the user & gets token
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

//controller for POST /api/users --> create new user
const registerUser = asyncHandler(async (req, res) => {
  // as per model
  const { name, email, password } = req.body;

  //check if emails already taken
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //create new user with name email PW (will be encrypted with mongoose MW)
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    //respond with 201(something was created) & new user info wesaved
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//controller for GET api/users/profile PRIVATE ROUTE
const getUserProfile = asyncHandler(async (req, res) => {
  //req.user._id populated by auth Middlware
  const user = await User.findById(req.user._id);

  if (user) {
    //return logged in user data
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

//controller for PUT api/users/profile PRIVATE ROUTE
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//controller for GET api/users --> Gets all users PRIVATE&ADMIN
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//controller for DELETE /api/users/:id --> delete a user button PRIVATE&ADMIN
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User deleted" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//controller for  GET /api/users/:id --> Gets User By Id for Admin edit user(Private+Admin route)
const getUserById = asyncHandler(async (req, res) => {
  //dont include the password when returning the queried user object
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  //if user is found update the properties in the user object (besides the password, we deselected) with the new info in the req.body
  if (user) {
    //if nothing for that property was updated, then keep the original property info that was in the user object
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
};
