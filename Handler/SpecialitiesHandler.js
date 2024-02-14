const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const specialitiesSchema = require("../Schema/SpecialitiesSchema");
const {
  readMiddleware,
  createMiddleware,
  updateMiddleware,
  deleteMiddleware,
} = require("../middleware/crudMiddleware");

const Specialities = new mongoose.model("Specialities", specialitiesSchema);
router.post("/", createMiddleware(Specialities));
router.get("/", readMiddleware(Specialities));
router.put("/:id", updateMiddleware(Specialities));
router.delete("/:id", deleteMiddleware(Specialities));
module.exports = router;
