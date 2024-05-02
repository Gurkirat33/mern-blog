const { Comment } = require("../models/comment.modal");
const handleError = require("../utils/error");

const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      return next(
        handleError(403, "You are not allowed to comment on this post!")
      );
    }
    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
};
