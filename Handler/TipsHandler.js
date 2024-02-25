const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const tipsSchema = require("../Schema/TipsSchema");
const { updateMiddleware } = require("../middleware/crudMiddleware");
const Tip = new mongoose.model("Tip", tipsSchema);

//get all tips
router.get("/", async (req, res) => {
  try {
    const { page = 1, pageSize = 8 } = req.query;
    const skip = (page - 1) * pageSize;
    const tip = await Tip.find({}).skip(skip).limit(Number(pageSize));
    const totalTips = await Tip.countDocuments({});
    const totalPages = Math.ceil(totalTips / pageSize);
    res.send({
      tip,
      totalPages,
      success: true,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to save tips data" });
  }
});
router.get("/all", async (req, res) => {
  try {
    const allTips = await Tip.find({});
    res.send({
      allTips,
      success: true,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to save tips data" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Tip.findById(id);
    res.send(result);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to get single doctor data" });
  }
});
//post tips
router.post("/", async (req, res) => {
  try {
    const newTip = new Tip(req.body);
    await newTip.save();
    res.status(201).send({ message: "Send successfully ", success: true });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to save Tips data" });
  }
});
router.delete("/all/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    result = await Tip.deleteOne({ _id: id });
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.put("/all/:id", updateMiddleware(Tip));
module.exports = router;
