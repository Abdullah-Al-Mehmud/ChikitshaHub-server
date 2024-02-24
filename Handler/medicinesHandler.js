const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const medicineSchema = require("../Schema/MedicineSchema");
const Medicine = new mongoose.model("Medicine", medicineSchema);

//post medicine
router.post("/", async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    // console.log(newMedicine);
    await newMedicine.save();
    console.log(newMedicine);
    res.status(201).send({ message: "Send successfully ", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save medicine data" });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const medicine = req.body;
//     const query = await User.findOne({ meetingId: medicine.meetingId });
//     if (query) {
//       return res
//         .status(200)
//         .json({ message: "meetingId already exists", success: false });
//     }

//     const newMedicine = new Medicine(medicine);
//     await newMedicine.save();
//     console.log(newMedicine);
//     res.status(201).send({ message: "Send successfully ", success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "unable to save medicine data" });
//   }
// });
router.get("/", async (req, res) => {
  try {
    const medicine = await Medicine.find();
    // console.log(medicine);
    res.send(medicine);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save medicine data" });
  }
});
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    // console.log(email);
    const medicine = await Medicine.find({ email: email });
    res.send(medicine);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save medicine data" });
  }
});
/* router.get("/:meetingId", async (req, res) => {
  try {
    const meetingId = req.params.meetingId;
    // console.log(meetingId);
    // console.log(meetingId);
    const medicine = await Medicine.find({ meetingId: meetingId });
    console.log(medicine);
    res.send(medicine);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save medicine data" });
  }
}); */

router.get("/meeting/:meetingId", async (req, res) => {
  try {
    const meetingId = req.params.meetingId;
    console.log(meetingId)
    const medicine = await Medicine.find({ meetingId: meetingId });
    res.send(medicine);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to fetch medicine data" });
  }
});


module.exports = router;
