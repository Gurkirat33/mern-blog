const express = require("express");
const { verifyToken } = require("../utils/verifyUser.js");
const {
  create,
  getposts,
  deletePost,
} = require("../controller/post.controller.js");
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
router.delete("/deletepost/:postId/:userId", verifyToken, deletePost);
module.exports = router;
