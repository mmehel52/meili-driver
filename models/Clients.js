const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClientSchema = new mongoose.Schema(
  {
    country: { code: String, dialCode: String, name: String },

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
    phone: {
      type: Number,
    },
    profilPicture: {
      type: String,
    },
    tripHistory: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
