const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userSchema = require("../Schema/userSchema");
const { verifyToken } = require("../middleware/VerifyToken");
const { verifyAdmin } = require("../middleware/VerifyAdmin");
const { verifyDoctor } = require("../middleware/VerifyDoctor");

const User = new mongoose.model("User", userSchema);

// get users
router.get("/", async (req, res) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (error) {
    // console.log(error);
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
      return res
        .status(200)
        .json({ message: "User already exists", success: false });
    }

    const newUser = new User(user);
    await newUser.save();
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to get single user data" });
  }
});

// set as admin
router.patch("/admin/setRole/:id", async (req, res) => {
  try {
    const result = await User.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          role: "admin",
        },
      }
    );
    if (result.modifiedCount === 1) {
      res.status(201).send({
        message: "updated successfully ",
        success: true,
        modifiedCount: result.modifiedCount,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Document not found or not modified",
      success: false,
      modifiedCount: result.modifiedCount,
    });
  }
});
router.patch("/admin/setDocRole/:id", async (req, res) => {
  try {
    const result = await User.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          role: "doctor",
        },
      }
    );
    if (result.modifiedCount === 1) {
      res.status(201).send({
        message: "updated successfully ",
        success: true,
        modifiedCount: result.modifiedCount,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Document not found or not modified",
      success: false,
      modifiedCount: result.modifiedCount,
    });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    result = await User.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(201).send({ success: true });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/admin/:email", verifyToken, verifyAdmin, async (req, res) => {
  const email = req.params.email;
  if (email !== req.decoded.email) {
    return res.status(403).send({ message: "forbidden access" });
  }
  const query = { email: email };
  const user = await User.findOne(query);

  const isAdmin = user?.role === "admin" ? true : false;

  // console.log(isAdmin);

  res.send({ isAdmin });
});

router.get("/doctor/:email", verifyToken, verifyDoctor, async (req, res) => {
  const email = req.params.email;
  if (email !== req.decoded.email) {
    return res.status(403).send({ message: "forbidden access" });
  }
  const query = { email: email };
  const user = await User.findOne(query);

  const isDoctor = user?.role === "doctor" ? true : false;
  res.send({ isDoctor });
});

module.exports = router;
