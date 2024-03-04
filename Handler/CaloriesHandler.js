const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const CalorieSchemaNew = require("../Schema/CaloriesSchema");
const CalorieSchemaNew = require('../Schema/CalorieSchemaNew');

const Calories = new mongoose.model("Calories", CalorieSchemaNew);

// get the bmi info
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const result = await Calories.find({email:email});
    res.send(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to find bmi data" });
  }
});
// post the bmi data
router.post("/", async (req, res) => {
    try {
      const newCalories = new Calories(req.body);
      // const result = await newBmi.save();
      console.log(newCalories);
      await newCalories.save();
      // res.send(result);
      res.status(201).send({ message: "added successfully ", success: true });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ msg: "unable to save bmi data" });
    }
  });
  
  module.exports = router;