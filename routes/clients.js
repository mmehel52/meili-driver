const express = require("express");
const {
  updateClient,
  deleteClient,
  getClient,
  getClients,
} = require("../controllers/clients");
const { verifyToken, verifyUser, verifyAdmin } = require("../util/verifyToken");

const router = express.Router();

router.put("/:id", verifyUser, updateClient);
router.delete("/:id", verifyUser, deleteClient);
router.get("/:id", verifyUser, getClient);
router.get("/", verifyAdmin, getClients);
module.exports = router;
