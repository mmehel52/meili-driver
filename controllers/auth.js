const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { createError } = require("../util/error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      phone_number: req.body.phone_number,
      birthday: req.body.birthday,
      gender: req.body.gender,
      location: req.body.location,
      states: req.body.states,
      photo: req.body.photo,
      tripHistory: req.body.tripHistory,
      rating: req.body.rating,
      car_details: [
        {
          car_model: req.body.car_details.car_model,
          car_number: req.body.car_details.car_number,
          car_type: req.body.car_details.car_type,
        },
      ],
      earnings: req.body.earnings,
      // new_ride_status: req.body.new_ride_status,
    });
    await newUser.save();
    res.status(200).send("user has been created");
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "UserRR not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
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
