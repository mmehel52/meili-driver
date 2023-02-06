const mongoose = require("mongoose");
const { Schema } = mongoose;

const RequestSchema = new mongoose.Schema(
  {
    car_model: {
      type: String,
    },
    destination: {
      latitude: String,
      longitude: String,
    },
    destination_adress: {
      type: String,
    },
    driver_id: {
      type: String,
    },
    driver_location: {
      latitude: String,
      longitude: String,
    },
    driver_name: {
      type: String,
    },
    fare_amount: {
      type: String,
    },
    origin: {
      latitude: String,
      longitude: String,
    },
    origin_address: {
      type: String,
    },
    payment: {
      fare_amount: Number,
      payment_id: String,
      status: String,
      time: Date,
    },
    client_id: {
      type: String,
    },
    client_name: {
      type: String,
    },
    client_phone: {
      type: Number,
    },
  },

  { timestamps: true }
);

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
