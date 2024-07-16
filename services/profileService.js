const ClosedProfileDto = require("../dtos/closedProfileDto");
const UserDto = require("../dtos/UserDto");
const ApiError = require("../exceptions/ApiError");
const User = require("../models/User");

const profileService = {
    async getUserById(userId, id) {
        const userFound = await User.findById(id);
        if(!userFound) {
            throw ApiError.NotFound("User is not found");
        }

        if(userFound.isProfileClosed && !userFound.followers.find(i => i === userId) && userId !== id) {
            return new ClosedProfileDto(userFound)
        }

        const user = new UserDto(userFound);

        return user;
    },

    async editProfile(id, data) {
        const profileEdited = await User.findByIdAndUpdate(id, {
            ...data
        }, {
            new: true
        });

        const user = new UserDto(profileEdited);
        return {
            isEdited: true,
            user
        }
    }
}

module.exports = profileService;