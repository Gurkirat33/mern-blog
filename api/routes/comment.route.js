const express = require("express");
const {
  createComment,
  getcomments,
  likeComment,
} = require("../controller/comment.controller");
const { verifyToken } = require("../utils/verifyUser");

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getcomments/:postId", getcomments);
router.put("/likeComment/:commentId", verifyToken, likeComment);

module.exports = router;
