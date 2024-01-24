const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const DoctorSchema = require("../Schema/DoctorSchema");

const Doctor = new mongoose.model("Doctor", DoctorSchema);

// get your all doctors documents
router.get("/", async (req, res) => {
  try {
    const result = await Doctor.find();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to get doctor data" });
  }
});

// get data by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Doctor.findById(id);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to get single doctor data" });
  }
});

// get data by category
router.get("/1/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const result = await Doctor.find({category: category});
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to get single doctor data" });
  }
});

// post your document
router.post("/", async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);

    const result = await newDoctor.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save doctor data" });
  }
});

module.exports = router;
