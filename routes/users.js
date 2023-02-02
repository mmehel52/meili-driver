const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/users");
const { verifyToken, verifyUser, verifyAdmin } = require("../util/verifyToken");

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user,you are logged in");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user,you are logged in and you can delete you account");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello admin,you are logged in and you can delete all accounts");
// });

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getUser);
router.get("/", verifyAdmin, getUsers);
module.exports = router;
