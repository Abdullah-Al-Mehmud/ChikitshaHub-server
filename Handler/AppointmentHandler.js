const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AppointmentSchema = require('../Schema/AppointmentSchema');
const Appointment = new mongoose.model('Appointment', AppointmentSchema);



// get the appointment info
router.get('/', async(req,res)=>{
    try {
        const email = req.params.email;
        const query = {email: email};
        const result = await Appointment.find(query);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "unable to find appointment data" });
    }
});


// post the appointment data
router.post("/", async(req,res)=>{
    try {
        const data = req.body;
        const newAppointment = new Appointment(data);
        await newAppointment.save();
        res.status(201).send({ message: "added successfully ", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "unable to save appointment data" });
    }
})


