const express = require("express");
const {
  createComment,
  getcomments,
  likeComment,
  editComment,
  deleteComment,
  getComment,
} = require("../controller/comment.controller");
const { verifyToken } = require("../utils/verifyUser");

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getcomments/:postId", getcomments);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/editComment/:commentId", verifyToken, editComment);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);
router.get("/getcomment", verifyToken, getComment);

module.exports = router;
