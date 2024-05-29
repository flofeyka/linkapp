const commentDto = require("../dtos/comment-dto");
const commentsModel = require("../models/comments-model");
const postsModel = require("../models/posts-model");

module.exports = new (class commentsService {
  async getCommentsByPostId(postId) {
    const comments = await commentsModel.find({ postId });
    return comments.map((comment) => new commentDto(comment));
  }

  async getCommentById(id) {
    const comment = await commentsModel.findOne({ _id: id });
    return new commentDto(comment);
  }

  async createComment(
    postId,
    userId,
    message,
    isChanged = false,
    isPinned = false
  ) {
    const newComment = await commentsModel.create({
      postId,
      userId,
      message,
      isChanged,
      isPinned,
      date: new Date(),
    });

    const commentDTO = new commentDto(newComment);
    await postsModel.updateOne(
      { _id: postId },
      { $push: { comments: commentDTO.id } }
    );
    return commentDTO;
  }

  async deleteComment(id) {
    const commentFound = await commentsModel.findOne({ _id: id });
    const postId = commentFound.postId;
    const deletedComment = await commentsModel.deleteOne({ _id: id });
    await postsModel.updateOne({ _id: postId }, { $pull: { comments: id } });
    return deletedComment.deletedCount === 1;
  }

  async editComment(id, message) {
    const editedComment = await commentsModel.updateOne(
      { _id: id },
      { message: message }
    );
    await commentsModel.updateOne({ _id: id }, { isChanged: true });
    return editedComment.modifiedCount === 1;
  }

  async pinComment(id) {
    const pinnedComment = await commentsModel.updateOne(
      { _id: id },
      { isPinned: true }
    );
    return pinnedComment.modifiedCount === 1;
  }

  async unPinComment(id) {
    const unPinnedComment = await commentsModel.updateOne(
      { _id: id },
      { isPinned: false }
    );
    return unPinnedComment.modifiedCount === 1;
  }
})();
