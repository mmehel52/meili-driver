const Driver = require("../models/Drivers");
const User = require("../models/Users");

const { createError } = require("../util/error");

const createDriver = async (req, res, next) => {
  const userId = req.params.userid;
  const newDriver = new Driver(req.body);

  try {
    const saveDriver = await newDriver.save();
    try {
      await User.findByIdAndUpdate(userId, {
        $push: { drivers: saveDriver._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(saveDriver);
  } catch (err) {
    next();
  }
};
const updateDriver = async (req, res, next) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedDriver);
  } catch (err) {
    next(err);
  }
};
const deleteDriver = async (req, res, next) => {
  const userId = req.params.userid;
  try {
    await Driver.findByIdAndDelete(req.params.id);
    try {
      await User.findByIdAndUpdate(userId, {
        $pull: { drivers: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Driver has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
const getDriver = async (req, res, next) => {
  try {
    const driver = await Driver.findById(req.params.id);
    res.status(200).json(driver);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getDrivers = async (req, res, next) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createDriver,
  updateDriver,
  deleteDriver,
  getDriver,
  getDrivers,
};
