const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const reviewSchema = require("../Schema/ReviewSchema");
const {
  readMiddleware
} = require("../middleware/crudMiddleware");
const Reviews = new mongoose.model("Review", reviewSchema);

// post reviews

router.post("/", async (req, res) => {
  try {
    const newReview = new Reviews(req.body);
    await newReview.save();
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save review data" });
  }
});
router.get("/", readMiddleware(Reviews));

module.exports = router;
