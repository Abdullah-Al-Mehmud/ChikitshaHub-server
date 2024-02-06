const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const messageSchema = require("../Schema/MessageSchema");

const Message = new mongoose.model("Message", messageSchema);

router.get("/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;
    const result = await Message.find({ chatId });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save message data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { chatId, senderEmail, text } = req.body;
    const newMessage = new Message({
      chatId,
      senderEmail,
      text,
    });
    await newMessage.save();
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save message data" });
  }
});

module.exports = router;
