const Client = require("../models/Clients.js");

const updateClient = async (req, res, next) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedClient);
  } catch (err) {
    next(err);
  }
};
const deleteClient = async (req, res, next) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json("Client has been deleted");
  } catch (err) {
    next(err);
  }
};
const getClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    res.status(200).json(client);
  } catch (err) {
    next(err);
  }
};
const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateClient,
  deleteClient,
  getClient,
  getClients,
};
