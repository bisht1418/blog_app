const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../Model/users.model");
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
  try {
    const { email, username, password, avatar } = req.body;

    const isExistingUser = await userModel.findOne({ email });

    if (isExistingUser) {
      return res.json({ message: "user already register" });
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const newUser = new userModel({
      email,
      password: hashPassword,
      avatar,
      username,
    });
    await newUser.save();

    res.json({ message: "sucessfully register" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const isExistingUser = await userModel.findOne({ email });

    if (!isExistingUser) {
      return res.json({ message: "user not found" });
    }

    const isCorrectPassword = bcrypt.compare(password, isExistingUser.password);

    if (!isCorrectPassword) {
      return res.json({ mesage: "wrong password" });
    }

    const token = await jwt.sign(
      { user: isExistingUser },
      process.env.JWT_SECRET_KEY
    );

    res.json({ token, user: isExistingUser });
  } catch (error) {
    res.json({ message: error.message });
  }
});

userRouter.get("/", async (req, res) => {
  const users = await userModel.find();
  res.json({ data: users });
});

module.exports = { userRouter };
