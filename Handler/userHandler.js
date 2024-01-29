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
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await User.find({ email: email });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to get single user data" });
  }
});

// post data
router.post("/", async (req, res) => {
  try {
    const user = req.body;
    const query = await User.findOne({ email: user.email });
    if (query) {
      res.status(201).send({ message: "user already exists " });
    }

    const newUser = new User(user);
    await newUser.save();
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to get single user data" });
  }
});

module.exports = router;
