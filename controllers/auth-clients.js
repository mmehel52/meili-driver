const Client = require("../models/Clients");
const bcrypt = require("bcrypt");
const { createError } = require("../util/error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newClient = new Client({
      country: {
        code: req.body.country.code,
        dialCode: req.body.country.dialCode,
        name: req.body.country.name,
      },
      name: req.body.name,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      profilPicture: req.body.profilPicture,
      tripHistory: req.body.tripHistory,
    });
    await newClient.save();
    res.status(200).send("Client has been created");
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client) return next(createError(404, "Client not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      client.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or email"));

    const token = jwt.sign(
      { id: client._id, isAdmin: client.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = client._doc;
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
