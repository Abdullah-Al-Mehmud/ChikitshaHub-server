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
        res.status(201).send({ message: "Send successfully ", success: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "unable to save medicine data" });
      }
})

module.exports = router;