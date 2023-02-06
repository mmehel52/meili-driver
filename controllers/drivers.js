const Driver = require("../models/Drivers.js");

const updateDriver = async (req, res, next) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedDriver);
  } catch (err) {
    next(err);
  }
};
const deleteDriver = async (req, res, next) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.status(200).json("Driver has been deleted");
  } catch (err) {
    next(err);
  }
};
const getDriver = async (req, res, next) => {
  try {
    const driver = await Driver.findById(req.params.id);
    res.status(200).json(driver);
  } catch (err) {
    next(err);
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
  updateDriver,
  deleteDriver,
  getDriver,
  getDrivers,
};
