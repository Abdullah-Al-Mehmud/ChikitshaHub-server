const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const doctorHandler = require("./Handler/DoctorHandler");
const userHandler = require("./Handler/userHandler");
const bmiHandler = require("./Handler/BMIHandler");
const appointmentHandler = require("./Handler/AppointmentHandler");
const chatHandler = require("./Handler/ChatHandler");
const messageHandler = require("./Handler/MessageHandler");
const sendEmailHandler = require("./Handler/SendEmailHandler");

// middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.URI)
  .then(() => console.log("connected successful"))
  .catch((err) => console.log(err));

// application routes
app.use("/doctors", doctorHandler);
app.use("/users", userHandler);
app.use("/bmi", bmiHandler);
app.use("/appointments", appointmentHandler);
app.use("/chat", chatHandler);
app.use("/messages", messageHandler);
app.use("/sendEmail",sendEmailHandler );

app.use("/", (req, res) => {
  res.send("Chikitsha Hub server");
});

app.listen(port);
