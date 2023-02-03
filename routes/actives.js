const express = require("express");
const {
  updateActive,
  deleteActive,
  getActive,
  getActives,
  createActive,
} = require("../controllers/actives");
const { verifyToken, verifyUser, verifyAdmin } = require("../util/verifyToken");

const router = express.Router();

router.post("/:userid", verifyUser, createActive);
router.put("/:id", verifyUser, updateActive);
router.delete("/:id/:userid", verifyUser, deleteActive);
router.get("/:id", getActive);
router.get("/", getActives);
module.exports = router;
