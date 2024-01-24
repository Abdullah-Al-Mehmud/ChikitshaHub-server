const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userSchema = require("../Schema/userSchema");

const User = new mongoose.model("User", userSchema);

// get users
router.get("/", async (req, res) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to get user data" });
  }
});

// get data by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findById(id);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to get single user data" });
  }
});

// post data
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to get single user data" });
  }
});

module.exports = router;
