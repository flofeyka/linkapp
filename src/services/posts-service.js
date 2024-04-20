const postsModel = require("../models/posts-model")
const PostDto = require("../dtos/post-dto")
class postsService {
    async getPostById(postId) {
        return await postsModel.findOne({_id: postId});
    }

    async getPostsByUserId(userId) {
        return await postsModel.find({userId});
    }

    async createPost(message, userId, isPinned = false) {
        const newPost = await postsModel.create({
            userId, message, isPinned
        });

        const postDto = new PostDto(newPost);
        return postDto;
    }

    async editPost(id, message) {
        const editedPostResult = await postsModel.updateOne({_id: id, message});
        return editedPostResult.modifiedCount === 1;
    }

    async deletePost(id) {
        const deletedPostResult = await postsModel.deleteOne({_id: id});
        return deletedPostResult.deletedCount === 1;
    }

}
module.exports = new postsService();