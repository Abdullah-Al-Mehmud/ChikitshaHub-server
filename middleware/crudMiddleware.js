const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

// Create middleware
const createMiddleware = (Model) => async (req, res, next) => {
  try {
    const instance = new Model(req.body);
    console.log(instance);
    await instance.save();
    res.status(201).json(instance);
  } catch (error) {
    next(error);
  }
};

// Read middleware
const readMiddleware = (Model) => async (req, res, next) => {
  try {
    const instances = await Model.find({});
    // console.log(instances);
    res.json(instances);
  } catch (error) {
    next(error);
  }
};
const readMiddlewareEmail = (Model) => async (req, res, next) => {
  try {
    const { doctorEmail } = req.params;
    // console.log(doctorEmail);
    const instances = await Model.find({ doctorEmail: doctorEmail });
    res.json(instances);
  } catch (error) {
    next(error);
  }
};

// Read middleware Mail
const readMiddlewareMail = (Model) => async (req, res, next) => {
  try {
    const { email } = req.params;
    if (!email) {
      throw new Error("Email parameter is missing");
    }
    const query = { email };
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const [results, total] = await Promise.all([
      Model.find(query).skip(skip).limit(limitNumber).exec(),
      Model.countDocuments(query).exec(),
    ]);

    res.send({
      total,
      results,
    });
  } catch (error) {
    next(error);
  }
};

// Update middleware
// const updateMiddleware = (Model) => async (req, res, next) => {
//   try {
//     const updatedInstance = await Model.findOneAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     console.log(updatedInstance);
//     res.json(updatedInstance);
//   } catch (error) {
//     next(error);
//   }
// };
const updateMiddleware = (Model) => async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    console.log(filter);
    const updatedInstance = await Model.findOneAndUpdate(filter, req.body, {
      new: true,
    });
    console.log(updatedInstance);
    res.json(updatedInstance);
  } catch (error) {
    next(error);
  }
};

const patchMiddleware = (Model) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const { age, gender, bloodGroup, phoneNumber } = req.body;
    const dataToUpdate = {};
    if (age) dataToUpdate.age = age;
    if (gender) dataToUpdate.gender = gender;
    if (bloodGroup) dataToUpdate.bloodGroup = bloodGroup;
    if (phoneNumber) dataToUpdate.phoneNumber = phoneNumber;
    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({ message: "No valid update data provided" });
    }

    const updatedData = await Model.findByIdAndUpdate(
      id,
      { $set: dataToUpdate },
      { new: true }
    );
    return res.status(200).json({ data: updatedData });
  } catch (error) {
    next(error);
  }
};

// Delete middleware
const deleteMiddleware = (Model) => async (req, res, next) => {
  try {
    const result = await Model.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  errorHandler,
  createMiddleware,
  readMiddleware,
  readMiddlewareMail,
  updateMiddleware,
  deleteMiddleware,
  readMiddlewareEmail,
  patchMiddleware,
};
