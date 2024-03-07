const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const BodyFitNewSchema = require("../Schema/BodyFitNewSchema.js")
// const { createMiddleware } = require("../middleware/crudMiddleware");
const BodyFitNewSchema = require("../Schema/BodyFitNewSchema");
const BodyFit = new mongoose.model("Bodyfit", BodyFitNewSchema);

// get the bmi info
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    const result = await BodyFit.find({ email });
    res.send(result);
    // console.log(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to find bmi data" });
  }
});
// post the bmi data
// router.post("/", createMiddleware(BodyFit));
// post the bmi data
router.post("/", async (req, res) => {
  try {
    const newbodyfit = new BodyFit(req.body);
    // const result = await newBmi.save();
    await newbodyfit.save();
    // res.send(result);
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to save bmi data" });
  }
});

module.exports = router;
