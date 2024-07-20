const CtrlWrapper = require("../decorators/CtrlWrapper");
const resultWrapper = require("../decorators/resultWrapper");
const profileService = require("../services/profileService");

const getUserById = async (req, res) => {
    const userFound = await profileService.getUserById(req.user.id,req.params.id);
    return res.status(200).json(resultWrapper(0, "User is successfully got", {user: userFound}));
};

const updateProfile = async (req, res) => {
    const { name, status, isProfileClosed } = req.body;
    const data = { name, status, isProfileClosed };
    const userUpdated = await profileService.editProfile(req.user.id, { ...data });
    return res.status(userUpdated.isEdited ? 202 : 400).json(userUpdated.isEdited ? 
        resultWrapper(0, "Profile is successfully edited", { user: userUpdated.user }) :
        resultWrapper(10, "Bad data")
    )
}

const getUsers = async (req, res) => {
    const {term, isFollowing, isFollowed, page, pageSize} = req.query;
    const users = await profileService.getUsersList(term, isFollowing, isFollowed, req.user.id, page, pageSize);
    return res.json(users);
}

module.exports = {
    getUserById: CtrlWrapper(getUserById),
    updateProfile: CtrlWrapper(updateProfile),
    getUsers: CtrlWrapper(getUsers)
}