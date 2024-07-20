const ClosedProfileDto = require("../dtos/СlosedProfileDto");
const UserDto = require("../dtos/UserDto");
const ApiError = require("../exceptions/ApiError");
const User = require("../models/User");

const profileService = {
    async getUserById(userId, id) {
        const userFound = await User.findById(id);
        const me = await User.findById(userId);
        if (!userFound) {
            throw ApiError.NotFound("User is not found");
        }

        if (userFound.isProfileClosed && !userFound.followers.includes(me._id) && me._id !== userFound._id) {
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
    },

    async getUsersList(term = '', isFollowing = null, isFollowed = null, userId, page = 1, pageSize = 10) {
        // const userFound = await User.find({name: term}).skip(page * pageSize).limit(pageSize);
        let result = await User.aggregate([
            {
                $match: {
                    name: { $regex: term, $options: "i" }
                }
            },
            {
                $facet: {
                    metaData: [
                        {
                            $count: "totalCount"
                        },
                        {
                            $addFields: {
                                pageNumber: page,
                                totalPages: { $ceil: { $divide: ["$totalCount", pageSize] } }
                            }
                        }
                    ],
                    data: [
                        {
                            $skip: (page - 1) * pageSize
                        },
                        {
                            $limit: pageSize
                        }
                    ]
                }
            }
        ]);

        result = result[0];
        result.metaData = { ...result.metaData[0], count: result.data.length };

        const me = await User.findById(userId);

        let usersDtos = result.data.map(user => ({
            id: user._id,
            name: user.name,
            status: user.status,
            followersCount: user.followers.length,
            isFollowing: me.following.includes(user._id),
            isFollowed: me.following.includes(user._id)
        }));

        console.log(usersDtos);

        if (isFollowing !== null && isFollowing === "true" || "false") {
            usersDtos = usersDtos.filter(item => item === isFollowing !== "true");
        } else if (isFollowed !== null && isFollowed === "true" || "false") {
            usersDtos = usersDtos.filter(item => item === isFollowing !== "true");
        }


        return usersDtos;
    }
}

module.exports = profileService;