const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AppointmentSchema = require("../Schema/AppointmentSchema");
const { readMiddlewareMail } = require("../middleware/crudMiddleware");
const Appointment = new mongoose.model("Appointment", AppointmentSchema);

router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    const result = await Appointment.find({ email });
    res.send(result);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to find appointment data" });
  }
});




// post the appointment data
router.post("/", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    console.log(newAppointment);
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to save appointment data" });
  }
});
router.get("/:email", readMiddlewareMail);

module.exports = router;
