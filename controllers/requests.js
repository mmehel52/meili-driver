const Request = require("../models/Requests.js");
const Driver = require("../models/Drivers.js");
const Client = require("../models/Clients.js");

const createRequest = async (req, res, next) => {
  const driverId = req.params.driverid;
  const clientId = req.params.clientid;
  const newRequest = new Request(req.body);

  try {
    const savedRequest = await newRequest.save();

    try {
      await Driver.findByIdAndUpdate(driverId, {
        $push: {
          tripHistory: savedRequest._id,
          earnings: savedRequest.fare_amount,
        },
      });
    } catch (err) {
      next(err);
    }
    try {
      await Client.findByIdAndUpdate(clientId, {
        $push: { tripHistory: savedRequest._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRequest);
  } catch (err) {
    next(err);
  }
};
const deleteRequest = async (req, res, next) => {
  const driverId = req.params.driverid;
  const clientId = req.params.clientid;
  try {
    await Request.findByIdAndDelete(req.params.id);
    try {
      await Client.findByIdAndUpdate(clientId, {
        $pull: { tripHistory: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    try {
      await Driver.findByIdAndUpdate(driverId, {
        $pull: { earnings: req.params.fare_amount },
        $pull: { tripHistory: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Active has been deleted");
  } catch (err) {
    next(err);
  }
};
const getRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);

    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
};
const getRequests = async (req, res, next) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRequest,
  deleteRequest,
  getRequest,
  getRequests,
};
