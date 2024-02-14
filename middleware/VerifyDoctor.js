const mongoose = require("mongoose");
const userSchema = require("../Schema/userSchema");


const User = new mongoose.model("User", userSchema);

const verifyDoctor = async (req, res, next) => {
    const email = req.decoded.email;
    const query = { email: email };
    const user = await User.findOne(query);
    const isDoctor = user?.role === 'doctor' ? true : false;
    next();
}

module.exports = {
    verifyDoctor
};