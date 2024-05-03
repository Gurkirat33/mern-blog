const express = require("express");
const {
  createComment,
  getcomments,
} = require("../controller/comment.controller");
const { verifyToken } = require("../utils/verifyUser");

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getcomments/:postId", getcomments);

module.exports = router;
