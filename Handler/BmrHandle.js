const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const BodyFitNewSchema = require("../Schema/BodyFitNewSchema.js")
// const { createMiddleware } = require("../middleware/crudMiddleware");
const BMR = require('../Schema/BMRSchema');
const Bmr = new mongoose.model("Bmr", BMR);

// get the bmi info
router.get("/:email" , async (req, res) => {
  try {
    const  {email} = req.params;
    console.log(email);
    const result = await Bmr.find({ email });
    res.send(result);
    console.log(result);
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
    const newBodyBmr = new Bmr(req.body);
    // const result = await newBmi.save();
    await newBodyBmr.save();
    // res.send(result);
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to save bmi data" });
  }
});
  
  module.exports = router;