const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  signout,
} = require("../controller/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
module.exports = router;
