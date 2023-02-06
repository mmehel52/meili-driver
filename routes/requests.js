const express = require("express");
const {
  getRequest,
  getRequests,
  createRequest,
} = require("../controllers/requests");
const { verifyToken, verifyUser, verifyAdmin } = require("../util/verifyToken");

const router = express.Router();

router.post("/:clientid/:driverid", verifyUser, createRequest);
router.get("/:id", getRequest);
router.get("/", getRequests);
module.exports = router;
