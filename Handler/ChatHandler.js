const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const chatSchema = require("../Schema/ChatSchema");

const Chat = new mongoose.model("Chat", chatSchema);

router.get("/:userId", async (req, res) => {
  try {
    const chat = await Chat.find({ members: { $in: [req.params.userId] } });
    res.send(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save chat data" });
  }
});

router.get("/find/:firstId/:secondId", async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.send(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save chat data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newChat = new Chat({
      members: [req.body.senderId, req.body.receiverId],
    });
    await newChat.save();
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save chat data" });
  }
});

module.exports = router;
