const mongoose = require("mongoose");
const { Schema } = mongoose;

const DriverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
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
    dateOfJoining: {
      type: Date,
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
  },
  { timestamps: true }
);

const Driver = mongoose.model("Driver", DriverSchema);

module.exports = Driver;
