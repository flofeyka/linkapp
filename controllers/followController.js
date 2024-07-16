const CtrlWrapper = require("../decorators/CtrlWrapper");
const resultWrapper = require("../decorators/resultWrapper");
const followService = require("../services/followService")

const follow = async (req, res) => {
    const isFollowed = await followService.follow(req.user.id, req.params.id);
    return res.json(isFollowed ? resultWrapper(0, "Successful followed") : resultWrapper(10, "Following failed"));
}

const unFollow = async (req, res) => {
    const isUnfollowed = await followService.unfollow(req.user.id, req.params.id);
    return res.json(isUnfollowed ? resultWrapper(0, "Successful unfollowed") : resultWrapper(10, "Unfollowing failed"));
}

const getFollowers = async (req, res) => {
    const followersList = await followService.getFollowers(req.user.id);
    return res.json({
        totalCount: followersList.length,
        followers: followersList
    });
}

const getFollowing = async (req, res) => {
    const followingUserList = await followService.getFollowing(req.user.id);
    return res.json({
        totalCount: followingUserList.length,
        following: followingUserList
    });
}

module.exports = {
    follow: CtrlWrapper(follow),
    unFollow: CtrlWrapper(unFollow),
    getFollowers: CtrlWrapper(getFollowers),
    getFollowing: CtrlWrapper(getFollowing)
}