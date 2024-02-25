const mongoose = require("mongoose");
const userSchema = require("../Schema/userSchema");

const User = new mongoose.model("User", userSchema);

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await User.findOne(query);
  const isAdmin = user?.role === "admin" ? true : false;
  next();
};

module.exports = {
  verifyAdmin,
};
