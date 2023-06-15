const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decode = jwt.verify(
        token.split(" ")[1],
        process.env.JWT_SECRET_KEY
      );
      if (decode) {
        req.body.id = decode.user._id;
        req.body.username = decode.user.username;
        req.body.avatar = decode.user.avatar;
        next();
      } else {
        res.json({ message: "please login" });
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { auth };
