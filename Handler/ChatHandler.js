const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const chatSchema = require("../Schema/ChatSchema");

const Chat = new mongoose.model("Chat", chatSchema);

router.get("/:userEmail", async (req, res) => {
  try {
    const chat = await Chat.find({ members: { $in: [req.params.userEmail] } });
    res.send(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save chat data" });
  }
});

router.get("/find/:firstEmail/:secondEmail", async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstEmail, req.params.secondEmail] },
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
      members: [req.body.senderEmail, req.body.receiverEmail],
    });
    await newChat.save();
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save chat data" });
  }
});

module.exports = router;
