const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWTSecret);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Not Authorized");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ status: "error", message: err.toString() });
  }
};

module.exports = auth;
