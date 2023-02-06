const mongoose = require("mongoose");
const { Schema } = mongoose;

const DriverSchema = new mongoose.Schema(
  {
    name: {
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
    phone_prefix: {
      type: Number,
    },
    profilPicture: {
      type: String,
    },
    tripHistory: {
      type: [Number],
    },

    car_details: { car_model: String, car_number: Number, car_type: String },
    earnings: {
      type: [Number],
    },

    new_ride_status: {
      type: String,
      default: "offline",
    },
    actives: {
      type: String,
    },
  },
  { timestamps: true }
);

const Driver = mongoose.model("Driver", DriverSchema);

module.exports = Driver;
