const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to Database");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { connectDB };
