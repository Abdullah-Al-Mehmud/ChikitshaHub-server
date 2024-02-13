const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const doctorHandler = require("./Handler/DoctorHandler");
const userHandler = require("./Handler/userHandler");
const bmiHandler = require("./Handler/BMIHandler");
const appointmentHandler = require("./Handler/AppointmentHandler");
const sendEmailHandler = require("./Handler/SendEmailHandler");
const stripeHandler = require("./Handler/StripeHandler");
const tipsHandler = require("./Handler/TipsHandler");
const jwtHandler = require("./Handler/JwtHandler");

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
app.use("/sendEmail",sendEmailHandler );
app.use("/create-payment-intent", stripeHandler);
app.use("/jwt", jwtHandler);

//tips
app.use("/tips", tipsHandler);

app.use("/", (req, res) => {
  res.send("Chikitsha Hub server");
});


const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`server is running on: ${port}`)
});
