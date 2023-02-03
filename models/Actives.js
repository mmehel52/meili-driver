const mongoose = require("mongoose");
const GeoPoint = require("geopoint");
const { Schema } = mongoose;

const ActiveSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },

    position: { geohash: String, geopoint: String },
    active_status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

const Active = mongoose.model("Active", ActiveSchema);

module.exports = Active;
