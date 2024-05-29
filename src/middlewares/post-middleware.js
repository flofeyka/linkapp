const ApiError = require("../exceptions/api-error");
const commentsModel = require("../models/comments-model");
const postsService = require("../services/posts-service");

module.exports = async function (req, res, next) {
  try {
    const comment = await commentsModel.findOne({ _id: req.params.commentId });
    const currentPost = await postsService.getPostById(
      req.body.id || req.params.id || comment.postId
    );

    if (currentPost.userId.toString() !== req.user.id || !currentPost) {
      return next(ApiError.InvalidId());
    }
    next();
  } catch (e) {
    return next(ApiError.InvalidId());
  }
};
