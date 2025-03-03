const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;

// Hash password before exporting
const hashedPassword = bcrypt.hashSync(adminPassword, 10);

module.exports = {
  username: adminUsername,
  password: hashedPassword,
};
