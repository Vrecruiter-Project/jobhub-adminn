const bcrypt = require("bcryptjs");

const adminUsername = "Manjeet";
const adminPassword = "Saharan@94"; // Change this

// Hash password before exporting
const hashedPassword = bcrypt.hashSync(adminPassword, 10);

module.exports = {
  username: adminUsername,
  password: hashedPassword,
};
