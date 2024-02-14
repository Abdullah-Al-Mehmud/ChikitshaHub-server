const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const DoctorSchema = require("../Schema/DoctorSchema");

const Doctor = new mongoose.model("Doctor", DoctorSchema);

// get your all doctors documents
router.get("/", async (req, res) => {
  try {
    let query = { status: "verify" };
    const result = await Doctor.find(query);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to get doctor data" });
  }
});
// req for all doctors
router.get("/admin/docReq", async (req, res) => {
  try {
    let query = { status: "pending" };
    const result = await Doctor.find(query);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to get doctor data" });
  }
});
//

router.get("/search", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "name",
      sortOrder = 1,
      searchTerm,
      location,
    } = req.query;

    if (page < 1 || limit < 1) {
      throw new Error("Invalid pagination parameters");
    }
    if (!["name", "specialty", "location"].includes(sortBy)) {
      throw new Error("Invalid sortBy parameter");
    }
    if (sortOrder !== 1 && sortOrder !== -1) {
      throw new Error("Invalid sortOrder parameter");
    }
    const query = {};

    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i");
      query.$or = [
        { name: regex },
        { specialties: regex },
        { location: regex },
      ];
    }
    if (location) {
      query.location = location;
    }

    const doctors = await Doctor.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalDoctors = await Doctor.countDocuments(query);

    res.json({
      data: doctors,
      page,
      totalPages: Math.ceil(totalDoctors / limit),
      totalDoctors,
    });
  } catch (error) {
    console.error("Error while fetching doctors:", error);

    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Invalid request parameters" });
    } else {
      res.status(500).json({ message: "Server Error" });
    }
  }
});

// get data by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Doctor.findById(id);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to get single doctor data" });
  }
});

// get data by category
router.get("/1/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const result = await Doctor.find({ specialties: category });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to get single doctor data" });
  }
});

// post your document
router.post("/", async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to save doctor data" });
  }
});

router.patch("/admin/setStatus/:id", async (req, res) => {
  try {
    const result = await Doctor.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          status: "verify",
        },
      }
    );
    if (result.modifiedCount === 1) {
      res.status(201).send({
        message: "updated successfully ",
        success: true,
        modifiedCount: result.modifiedCount,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Document not found or not modified",
      success: false,
      modifiedCount: result.modifiedCount,
    });
  }
});

module.exports = router;
