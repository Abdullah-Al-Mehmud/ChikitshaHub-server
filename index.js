const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();

const doctorHandler = require("./Handler/DoctorHandler");
const userHandler = require("./Handler/userHandler");
const bmiHandler = require("./Handler/BMIHandler");
const appointmentHandler = require("./Handler/AppointmentHandler");
const sendEmailHandler = require("./Handler/SendEmailHandler");
const stripeHandler = require("./Handler/StripeHandler");
const tipsHandler = require("./Handler/TipsHandler");
const medicinesHandler = require("./Handler/medicinesHandler")
const jwtHandler = require("./Handler/JwtHandler");
const logoutHandler = require("./Handler/LogoutHandler");
const SpecialitiesHandler = require("./Handler/SpecialitiesHandler");
const doctorReviewHandler = require("./Handler/DoctorReviewHandler");

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};
// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.URI)
  .then(() => console.log("connected successful"))
  .catch((err) => console.log(err));

// application routes
app.use("/doctors", doctorHandler);
app.use("/users", userHandler);
app.use("/bmi", bmiHandler);
app.use("/appointments", appointmentHandler);
app.use("/sendEmail", sendEmailHandler);
app.use("/doctorReview", doctorReviewHandler);
app.use("/create-payment-intent", stripeHandler);
app.use("/jwt", jwtHandler);
app.use("/logout", logoutHandler);

//tips
app.use("/tips", tipsHandler);
app.use("/specialities", SpecialitiesHandler);

//medicines
app.use("/medicines", medicinesHandler);

app.use("/", (req, res) => {
  res.send("Chikitsha Hub server");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on: ${port}`);
});
