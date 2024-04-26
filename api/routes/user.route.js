const express = require("express");
const router = express.Router();
const { updateUser } = require("../controller/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

router.put("/update/:userId", verifyToken, updateUser);
module.exports = router;
