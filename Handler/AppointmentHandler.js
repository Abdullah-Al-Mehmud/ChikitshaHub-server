const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AppointmentSchema = require("../Schema/AppointmentSchema");
const { readMiddlewareMail } = require("../middleware/crudMiddleware");
const { verifyToken } = require("../middleware/VerifyToken");
const { verifyAdmin } = require("../middleware/VerifyAdmin");
const Appointment = new mongoose.model("Appointment", AppointmentSchema);

router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await Appointment.find();
    res.send(result);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to find appointment data" });
  }
});

router.get("/doctors/:doctorEmail", verifyToken, async (req, res) => {
  try {
    const { doctorEmail } = req.params;
    // console.log(doctorEmail);
    const result = await Appointment.find({ doctorEmail });
    res.send(result);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to find appointment data" });
  }
});

router.get("/patients/:patientEmail", verifyToken, async (req, res) => {
  try {
    const { patientEmail } = req.params;
    const result = await Appointment.find({ patientEmail });
    res.send(result);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to find appointment data" });
  }
});

// post the appointment data
router.post("/", verifyToken, async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    console.log(newAppointment);
    await newAppointment.save();
    console.log(newAppointment);
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to save appointment data" });
  }
});

module.exports = router;
