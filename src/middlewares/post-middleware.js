const ApiError = require("../exceptions/api-error");
const postsService = require("../services/posts-service");


module.exports = async function (req, res, next) {
    try {
        const currentPost = await postsService.getPostById(req.body.id || req.params.id);
        
        if(currentPost.userId.toString() !== req.user.id) {
            return next(ApiError.InvalidId());
        }
        next();
    } catch (e) {
        return next(ApiError.InvalidId());
    }
}