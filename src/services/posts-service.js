const postsModel = require("../models/posts-model");
const PostDto = require("../dtos/post-dto");
const ApiError = require("../exceptions/api-error");
const usersService = require("./users-service");

class postsService {
  async getPostById(postId) {
    const foundPost = await postsModel.findOne({ _id: postId });
    const postDto = new PostDto(foundPost);
    return postDto;
  }

  async getPostsByUserId(userId) {
    const postsFound = await postsModel.find({ userId });
    const postDtos = postsFound.map((post) => new PostDto(post));
    return postDtos;
  }

  async createPost(message, userId, isPinned = false) {
    const newPost = await postsModel.create({
      userId,
      message,
      isPinned,
      isChanged: false,
      date: new Date(),
    });
    if (newPost.length === 0) {
      throw ApiError.BadRequest("Cannot to create the post");
    }

    const postDto = new PostDto(newPost);
    return postDto;
  }

  async editPost(id, message) {
    const editedPostResult = await postsModel.updateOne(
      { _id: id },
      { message }
    );
    await postsModel.updateOne({ _id: id }, { isChanged: true });
    if (editedPostResult.modifiedCount === 0) {
      throw ApiError.notFound("Cannot to edit the post");
    }
    return editedPostResult.modifiedCount === 1;
  }

  async deletePost(id) {
    const deletedPostResult = await postsModel.deleteOne({ _id: id });
    if (deletedPostResult.deletedCount === 0) {
      throw ApiError.notFound("Cannot to delete the post");
    }
    return deletedPostResult.deletedCount === 1;
  }

  async __getPinnedPosts(id) {
    const pinnedPosts = await postsModel.find({ userId: id, isPinned: true });
    const pinnedPostDtos = pinnedPosts.map((post) => new PostDto(post));
    return pinnedPostDtos;
  }

  async pinPost(id) {
    if ((await this.__getPinnedPosts(id).length) >= 3) {
      throw ApiError.BadRequest("Pinned posts limit exceeded");
    } else if (await this.getPostById(id).isPinned) {
      throw ApiError.BadRequest("Post is already pinned");
    }

    const result = await postsModel.updateOne({ _id: id }, { isPinned: true });
    return result.modifiedCount === 1;
  }

  async unPinPost(id) {
    if ((await this.__getPinnedPosts(id).length) === 0) {
      throw ApiError.BadRequest("Nothing to unpin");
    } else if (!(await this.getPostById(id).isPinned)) {
      throw ApiError.BadRequest("Post is not pinned");
    }

    const result = await postsModel.updateOne({ _id: id }, { isPinned: false });
    return result.modifiedCount === 1;
  }
}
module.exports = new postsService();
