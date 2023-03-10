const Active = require("../models/Actives.js");
const Driver = require("../models/Drivers.js");

const createActive = async (req, res, next) => {
  const driverId = req.params.driverid;
  const newActive = new Active(req.body);

  try {
    const savedActive = await newActive.save();
    try {
      await Driver.findByIdAndUpdate(driverId, {
        $set: { actives: savedActive._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedActive);
  } catch (err) {
    next(err);
  }
};
const updateActive = async (req, res, next) => {
  try {
    const updatedActive = await Active.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedActive);
  } catch (err) {
    next(err);
  }
};
const deleteActive = async (req, res, next) => {
  const driverId = req.params.driverid;
  try {
    await Active.findByIdAndDelete(req.params.id);
    try {
      await Driver.findByIdAndUpdate(driverId, {
        $unset: { actives: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Active has been deleted");
  } catch (err) {
    next(err);
  }
};
const getActive = async (req, res, next) => {
  try {
    const active = await Active.findById(req.params.id);

    res.status(200).json(active);
  } catch (err) {
    next(err);
  }
};
const getActives = async (req, res, next) => {
  try {
    const actives = await Active.find();
    res.status(200).json(actives);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createActive,
  updateActive,
  deleteActive,
  getActive,
  getActives,
};
