const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });
const app = express();
const port = process.env.PORT || 3000;
const doctorHandler = require("./Handler/DoctorHandler");
const userHandler = require("./Handler/userHandler");
const bmiHandler = require("./Handler/BMIHandler");
const appointmentHandler = require("./Handler/AppointmentHandler");
const chatHandler = require("./Handler/ChatHandler");
const messageHandler = require("./Handler/MessageHandler");
const sendEmailHandler = require("./Handler/SendEmailHandler");
const stripeHandler = require("./Handler/StripeHandler");

const tipsHandler = require("./Handler/TipsHandler");

const SpecialitiesHandler = require("./Handler/SpecialitiesHandler");
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};
// middleware
app.use(cors(corsOptions));
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
app.use("/sendEmail", sendEmailHandler);
app.use("/create-payment-intent", stripeHandler);

//tips
app.use("/tips", tipsHandler);
app.use("/specialities", SpecialitiesHandler);

app.use("/", (req, res) => {
  res.send("Chikitsha Hub server");
});

app.listen(port);
