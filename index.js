const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const doctorHandler = require("./Handler/DoctorHandler");

// middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.URI)
  .then(() => console.log("connected successful"))
  .catch((err) => console.log(err));

// application routes
app.use("/doctors", doctorHandler);

app.use("/", (req, res) => {
  res.send("Chikitsha Hub server");
});

app.listen(port);
