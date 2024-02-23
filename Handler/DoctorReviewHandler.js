const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const doctorReviewSchema = require("../Schema/DoctorReviewSchema");
const Review = new mongoose.model("DoctorReview", doctorReviewSchema);

// post reviews
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await Review.find({ doctorEmail: email });
    res.send(result);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to get single doctor data" });
  }
});
router.post("/", async (req, res) => {
  try {
    const newDoctor = new Review(req.body);
    await newDoctor.save();
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save doctor data" });
  }
});
module.exports = router;
