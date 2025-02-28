
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log("Database connected Successfully!!")
  } catch (error) {
    console.error("ERROR: ", error);
    process.exit(1);
  }
};

// mongoose.model.exports = connectDB;

module.exports = connectDB