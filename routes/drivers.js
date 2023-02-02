const express = require("express");
const {
  createDriver,
  updateDriver,
  deleteDriver,
  getDriver,
  getDrivers,
} = require("../controllers/drivers");
const { verifyUser, verifyAdmin } = require("../util/verifyToken");

const router = express.Router();

router.post("/:userid", verifyUser, createDriver);
router.put("/:id", verifyUser, updateDriver);
router.delete("/:id/:userid", verifyUser, deleteDriver);
router.get("/:id", verifyUser, getDriver);
router.get("/", verifyAdmin, getDrivers);
module.exports = router;
