const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {
  readMiddlewareMail,
  readMiddleware,
  createMiddleware,
  readMiddlewareEmail,
  deleteMiddleware,
} = require("../middleware/crudMiddleware");
const { verifyToken } = require("../middleware/VerifyToken");
const { verifyAdmin } = require("../middleware/VerifyAdmin");
const DoctorLiveReqSchema = require("../Schema/DoctorLiveReqSchema");
const DoctorLiveReq = new mongoose.model(
  "DoctorLiveReqSchema",
  DoctorLiveReqSchema
);
router.get("/", readMiddleware(DoctorLiveReq));
router.get("/:doctorEmail", readMiddlewareEmail(DoctorLiveReq));
router.post("/", createMiddleware(DoctorLiveReq));
router.delete("/:id", deleteMiddleware(DoctorLiveReq));

router.patch("/LiveStatus/:id", async (req, res) => {
  try {
    const result = await DoctorLiveReq.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          status: "approved",
        },
      }
    );
    console.log(result);
    res.send(result);
  } catch (error) {
    res.status(400).send({
      message: "Document not found or not modified",
      success: false,
    });
  }
});

module.exports = router;
