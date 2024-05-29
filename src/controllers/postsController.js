const postService = require("../services/posts-service");
const Results = require("../results/results");

class postsController {
  async getPostById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await postService.getPostById(id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getUsersPosts(req, res, next) {
    try {
      const postsFound = await postService.getPostsByUserId(req.params.userId);
      return res.json(postsFound);
    } catch (e) {
      next(e);
    }
  }

  async createPost(req, res, next) {
    try {
      const { message, isPinned } = req.body;
      const result = await postService.createPost(
        message,
        req.user.id,
        isPinned
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async editPost(req, res, next) {
    try {
      const { id, message } = req.body;
      const isEditedPost = await postService.editPost(id, message);
      return res.json(
        isEditedPost
          ? Results.successful("Post is edited successfully")
          : Results.unsuccessful()
      );
    } catch (e) {
      next(e);
    }
  }

  async deletePost(req, res, next) {
    try {
      const deletedPostResult = await postService.deletePost(req.params.id);
      return res.json(
        deletedPostResult
          ? Results.successful("Post deleted successfully")
          : Results.unsuccessful()
      );
    } catch (e) {
      next(e);
    }
  }

  async pinPost(req, res, next) {
    try {
      const pinnedPostResult = await postService.pinPost(req.params.id);
      return res.json(
        pinnedPostResult
          ? Results.successful("Post pinned successfully")
          : Results.unsuccessful()
      );
    } catch (e) {
      next(e);
    }
  }

  async unPinPost(req, res, next) {
    try {
      const unPinnedPostResult = await postService.unPinPost(req.params.id);
      return res.json(
        unPinnedPostResult
          ? Results.successful("Post unpinned successfully")
          : Results.unsuccessful()
      );
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new postsController();
