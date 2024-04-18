const express = require("express");
const { signup, google, signin } = require("../controller/auth.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
module.exports = router;
