const bcrypt = require("bcryptjs");
// const dotenv = require("dotenv");
// dotenv.config();

const adminUsername = "vr-admin";
const adminPassword = "updateadmin";

// Hash password before exporting
const hashedPassword = bcrypt.hashSync(adminPassword, 10);

module.exports = {
  username: adminUsername,
  password: hashedPassword,
};
