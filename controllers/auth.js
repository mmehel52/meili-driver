const Driver = require("../models/Drivers");
const bcrypt = require("bcrypt");
const { createError } = require("../util/error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newDriver = new Driver({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      phone_number: req.body.phone_number,
      phone_prefix: req.body.phone_prefix,
      profilPicture: req.body.profilPicture,
      tripHistory: req.body.tripHistory,
      car_details: {
        car_model: req.body.car_details.car_model,
        car_number: req.body.car_details.car_number,
        car_type: req.body.car_details.car_type,
      },
      earnings: req.body.earnings,
      new_ride_status: req.body.new_ride_status,
      actives: req.body.actives,
    });
    await newDriver.save();
    res.status(200).send("Driver has been created");
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const driver = await Driver.findOne({ email: req.body.email });
    if (!driver) return next(createError(404, "Driver not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      driver.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or email"));

    const token = jwt.sign(
      { id: driver._id, isAdmin: driver.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = driver._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};
