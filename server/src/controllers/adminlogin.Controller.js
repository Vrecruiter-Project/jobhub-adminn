const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const adminCredentials = require("../utils/adminCredentials");
const asyncHandler = require("../utils/asyncHandler");
const dotenv = require("dotenv");
dotenv.config();

const adminController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check username
  if (username !== adminCredentials.username) {
    return res.status(401).json({ message: "Invalid username" });
  }

  // Compare hashed password
  const isMatch = bcrypt.compareSync(password, adminCredentials.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // Generate JWT Token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Set HTTP-only cookie (more secure than localStorage)
  res.cookie("token", token, {
    httpOnly: true, // Prevents XSS
    secure: true, // Ensures cookies only over HTTPS
    sameSite: "None", // Prevent CSRF issues
  });
  

  res.status(200).json({ message: "Login successful!" });
});

module.exports = adminController;
