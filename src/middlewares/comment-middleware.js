const ApiError = require("../exceptions/api-error");
const commentsService = require("../services/comments-service");
const postsService = require("../services/posts-service");

module.exports = async function (req, res, next) {
  try {
    const currentComment = await commentsService.getCommentById(req.params.commentId || req.body.commentId); 

    if (currentComment.userId.toString() !== req.user.id || !currentComment) {
      return next(ApiError.InvalidId());
    }


    next();
  } catch (e) {
    next(ApiError.InvalidId());
  }
};
