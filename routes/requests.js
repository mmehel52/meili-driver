const express = require("express");
const {
  getRequest,
  getRequests,
  createRequest,
  deleteRequest,
} = require("../controllers/requests");
const { verifyToken, verifyUser, verifyAdmin } = require("../util/verifyToken");

const router = express.Router();

router.post("/:clientid/:driverid", verifyUser, createRequest);
router.delete("/:id", verifyUser, deleteRequest);
router.get("/:id", verifyUser, getRequest);
router.get("/", getRequests);
module.exports = router;
