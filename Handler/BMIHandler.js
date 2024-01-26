const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const BMISchema = require("../Schema/BMISchema");

const Bmi = new mongoose.model("Bmi", BMISchema);

// get the bmi info
router.get("/", async (req, res) => {
  try {
    let query = {};
    if (req.query.email) {
      query = { email: req.query.email };
    }
    const result = await Bmi.find(query);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to find bmi data" });
  }
});

// post the bmi data
router.post("/", async (req, res) => {
  try {
    const newBmi = new Bmi(req.body);
    // const result = await newBmi.save();
    await newBmi.save();
    // res.send(result);
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save bmi data" });
  }
});

module.exports = router;
