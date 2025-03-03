const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const protect = (req, res, next) => {
  const token = req.cookies.jwt; // Get token from HTTP-only cookie

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token,"ayush"); 
    req.admin = decoded; // Store admin data in request
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = protect;
