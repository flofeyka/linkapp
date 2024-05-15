const results = require("../results/results");
const commentsService = require("../services/comments-service");

module.exports = new (class commentsController {
  async getCommentsByPostId(req, res, next) {
    try {
      const { postId } = req.params;
      const commentsFound = await commentsService.getCommentsByPostId(postId);
      return res.json(
        commentsFound ? commentsFound : results.unsuccessful("Invalid post id")
      );
    } catch (e) {
      next(e);
    }
  }

  async createComment(req, res, next) {
    try {
      const createdComment = await commentsService.createComment(
        req.params.postId,
        req.user.id,
        req.body.message
      );
      return res.json(
        createdComment
          ? createdComment
          : results.unsuccessful("Comment is not created")
      );
    } catch (e) {
      next(e);
    }
  }

  async editComment(req, res, next) {
    try {
      const isEditedComment = await commentsService.editComment(
        req.params.commentId,
        req.body.message
      );
      return res.json(
        isEditedComment
          ? results.successful("Comment is edited successfully")
          : results.unsuccessful()
      );
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const deletedCommentResult = await commentsService.deleteComment(
        req.params.commentId
      );
      return res.json(
        deletedCommentResult
          ? results.successful("Comment deleted successfully")
          : results.unsuccessful("Error while deleting comment")
      );
    } catch (e) {
      next(e);
    }
  }

  async getCommentById(req, res, next) {
    try {
      const commentFound = await commentsService.getCommentById(
        req.params.commentId
      );
      return res.json(
        commentFound
          ? commentFound
          : results.unsuccessful("Error while getting comment by id")
      );
    } catch (e) {
      next(e);
    }
  }

  async pinComment(req, res, next) {
    try {
      const isPinned = await commentsService.pinComment(req.params.commentId);
      return res.json(
        isPinned
          ? results.successful("Comment is pinned successfully")
          : results.unsuccessful("Error while pinning comment")
      );
    } catch (e) {
      next(e);
    }
  }

  async unPinComment(req, res, next) {
    try {
      const isUnpinned = await commentsService.unPinComment(
        req.params.commentId
      );
      return res.json(
        isUnpinned
          ? results.successful("Comment is unpinned successfully")
          : results.unsuccessful("Error while unpinning comment")
      );
    } catch (e) {
      next(e);
    }
  }
})();
