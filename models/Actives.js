const mongoose = require("mongoose");
const { Schema } = mongoose;

const ActiveSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    position: [{ geohash: String, geopoint: [String] }],
  },
  { timestamps: true }
);

const Active = mongoose.model("Active", ActiveSchema);

module.exports = Active;
