const express = require("express");
const {
  updateDriver,
  deleteDriver,
  getDriver,
  getDrivers,
} = require("../controllers/drivers");
const { verifyToken, verifyUser, verifyAdmin } = require("../util/verifyToken");

const router = express.Router();

router.put("/:id", verifyUser, updateDriver);
router.delete("/:id", verifyUser, deleteDriver);
router.get("/:id", verifyUser, getDriver);
router.get("/", verifyAdmin, getDrivers);
module.exports = router;
