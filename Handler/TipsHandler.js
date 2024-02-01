const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const tipsSchema = require('../schemas/tipsSchema');
const Tip = new mongoose.model("Tip", tipsSchema);


//get all tips
router.get("/", async (req, res) => {
    try {
      const tip = await Tip.find();
      res.send(tip);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "unable to save tips data" });
    }
  });
//post tips
router.post('/', async(req, res)=>{
    try {
        const newTip = new Tip(req.body);
        await newTip.save();
        res.status(201).send({ message: "Send successfully ", success: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "unable to save Tips data" });
      }
})

module.exports = router;