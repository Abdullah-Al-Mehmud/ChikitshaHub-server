const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const DoctorSchema = require("../Schema/DoctorSchema");

const Doctor = new mongoose.model("Doctor", DoctorSchema);

router.post("/", async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save doctor data" });
  }
});

module.exports = router;
