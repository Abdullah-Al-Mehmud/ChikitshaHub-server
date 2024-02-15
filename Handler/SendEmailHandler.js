const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const router = express.Router();

const nodemailer = require("nodemailer");
const UserSchema = require("../Schema/userSchema");
// const Tips = require("./TipsHandler");
const sendEmailSchema = require("../Schema/SendEmailSchema");

const sendEmail = new mongoose.model("sendEmail", sendEmailSchema);
const User = mongoose.model("User", UserSchema);

router.post("/", async (req, res) => {
  try {
    const { heading, photoURL, description } = req.body;

    const newEmail = new sendEmail({ heading, photoURL, description });
    // await newEmail.save();
    console.log(newEmail);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.PASS,
      },
    });

    const users = await User.find({}, "email");

    const mailOptions = {
      from: process.env.Email,
      to: users.map((user) => user.email),
      subject: "New Tips From ChikitshaHub",
      message: `${heading}`,
      html: `<p>A new Tips <strong>"${heading}"</strong> has been published. Read it now!</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res
          .status(500)
          .json({ success: false, message: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(201).json({ success: true, email: newEmail });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to get email data" });
  }
});
module.exports = router;
