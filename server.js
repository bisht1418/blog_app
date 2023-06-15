const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./db");
const { userRouter } = require("./Route/users.route");
const { blogRouter } = require("./Route/blogs.route");
const { auth } = require("./Middleware/auth");

const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "welcome to blog_app" });
});
app.use("/users", userRouter);
app.use("/blogs", auth, blogRouter);

app.listen(port, async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log(error.message);
  }
  console.log(`connected to port ${port}`);
});
