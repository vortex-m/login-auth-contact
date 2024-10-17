const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../modals/contactModal.js");

// @desc Register a User
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password) {
    res.status(400); 
    throw new Error("Please fill all the fields");
  }

  // Check if user already exists
  const userAvail = await User.findOne({ email });
  if (userAvail) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password is: ", hashedPassword);

  // Create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // If the user is created successfully.
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Login a User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Working" });
});

// @desc Get Current User
// @route GET /api/users/current
// @access Private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Working" });
});

module.exports = { registerUser, loginUser, currentUser };
