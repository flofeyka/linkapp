const results = require("../results/results");
const commentsService = require("../services/comments-service");

module.exports = new class commentsController {
    async getCommentsByPostId(req, res, next) {
        try {
            const {postId} = req.params;
            const commentsFound = await commentsService.getCommentsByPostId(postId);
            return res.json(commentsFound);
        } catch(e) {
            next(e);
        }
    }

    async createComment(req, res, next) {
        try {
            const {postId, message} = req.body;
            const commentDTO = await commentsService.createComment(postId, req.user.id, message);
            return res.json(commentDTO);
        } catch(e) {
            next(e);
        }
    }

    async editComment(req, res, next) {
        try {
            const {id, message} = req.body;
            const isEditedComment = await commentsService.editComment(id, message);
            return res.json(isEditedComment ? results.successful("Comment is edited successfully") : results.unsuccessful())
        } catch(e) {
            next(e);
        }
    }

    async deleteComment(req, res, next) {
        try {
            const deletedCommentResult = await commentsService.deleteComment(req.params.id);
            return res.json(deletedCommentResult ? results.successful("Comment deleted successfully") : results.unsuccessful())
        } catch(e) {
            next(e);
        }
    }


}