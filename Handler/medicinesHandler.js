const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const medicineSchema =require('../Schema/MedicineSchema')
const Medicine = new mongoose.model("Medicine", medicineSchema);

//post medicine
router.post('/', async(req, res)=>{
    try {
        const newMedicine = new Medicine(req.body);
        await newMedicine.save();
        console.log(newMedicine);
        res.status(201).send({ message: "Send successfully ", success: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "unable to save medicine data" });
      }
})

router.get('/', async(req, res)=>{
  try {
    const medicine = await Medicine.find();
    res.send(medicine);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save medicine data" });
  }
})

// get data by id
router.get("/:meetingId", async (req, res) => {
  try {
    const id = req.params.meetingId;
    const result = await medicines.findOne(meetingId);
    res.send(result);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to get single doctor data" });
  }
});
module.exports = router;