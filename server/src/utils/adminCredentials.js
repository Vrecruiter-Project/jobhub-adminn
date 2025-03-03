const bcrypt = require("bcryptjs");

const adminUsername = "ayush";
const adminPassword = "ayush"; // Change this

// Hash password before exporting
const hashedPassword = bcrypt.hashSync(adminPassword, 10);

module.exports = {
  username: adminUsername,
  password: hashedPassword,
};
