const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
    },

    birthday: {
      type: Date,
    },
    gender: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    states: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    tripHistory: {
      type: [Number],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    car_details: [{ car_model: String, car_number: Number, car_type: String }],
    earnings: {
      type: [Number],
    },

    new_ride_status: {
      type: String,
      default: "offline",
    },
    actives: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
