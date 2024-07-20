const ApiError = require("../exceptions/ApiError");
const User = require("../models/User");

const followService = {
    async follow(userId, id) {
        const userFound = await User.findById(id);
        const me = await User.findById(userId);
        if (!userFound) {
            throw ApiError.NotFound("Following user is not found");
        }

        if (userFound.followers.includes(me._id)) {
            throw ApiError.BadRequest("User is following already");
        }

        if (me._id === userFound._id) {
            throw ApiError.BadRequest("You cannot following yourself");
        }

        try {
            await this.__updateFollowings(me._id, userFound._id, true);
            return true;
        } catch (error) {
            console.log(error);
            await this.__updateFollowings(me._id, userFound._id, false); // Отмена изменений
            throw ApiError.BadRequest("Following failed");
        }
    },

    async unfollow(userId, id) {
        const userFound = await User.findById(id);
        const me = await User.findById(userId);
        if (!userFound) {
            throw ApiError.NotFound("Following user is not found");
        }

        if (!userFound.followers.includes(me._id)) {
            throw ApiError.BadRequest("User is not following already");
        }

        try {
            await this.__updateFollowings(me._id, userFound._id, false);
            return true;
        } catch (error) {
            console.log(error);
            await this.__updateFollowings(me._id, userFound._id, true); // Возврат к предыдущему состоянию
            throw ApiError.BadRequest("Unfollowing failed");
        }
    },

    async __updateFollowings(userId, id, isFollowing) {
        const updateOperation = isFollowing ? '$push' : '$pull';
        await Promise.all([
            User.updateOne({ _id: id }, { [updateOperation]: { followers: userId } }),
            User.updateOne({ _id: userId }, { [updateOperation]: { following: id } })
        ]);
    },

    async getFollowers(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw ApiError.NotFound("User not found");
        }

        try {
            return Promise.all(user.followers.map(async followerId => {
                const follower = await User.findById(followerId);
                if (!follower) {
                    throw new Error(`Follower with ID ${followerId} not found`);
                }
                return {
                    id: follower._id,
                    name: follower.name,
                    isFollowing: user.following.includes(followerId)
                };
            }));
        } catch (error) {
            console.log(error);
            throw ApiError.BadRequest("Failed to get followers");
        }
    },

    async getFollowing(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw ApiError.NotFound("User not found");
        }

        try {
            return Promise.all(user.following.map(async followingId => {
                const following = await User.findById(followingId);
                if (!following) {
                    throw new Error(`Following with ID ${followingId} not found`);
                }
                return {
                    id: following._id,
                    name: following.name,
                    isSameFollowing: user.followers.includes(followingId)
                };
            }));
        } catch (error) {
            console.log(error);
            throw ApiError.BadRequest("Failed to get following");
        }
    }
};

module.exports = followService;
