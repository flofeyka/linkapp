"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileService = void 0;
const users_repository_1 = require("../repositories/users-repository");
exports.profileService = {
    getProfile: (domain) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield users_repository_1.usersRepository.__getUserByDomain(domain);
        return {
            uniqueUserDomain: user.uniqueUserDomain,
            fullName: user.fullName,
            followersCount: user.followersCount,
            followersMembers: user.followersMembers,
            status: user.status,
            friendsCount: user.friendsCount,
            friendsMember: user.friendsMember,
            photos: {
                small: user.photos.small,
                large: user.photos.large
            },
            location: {
                country: user.location.country,
                city: user.location.city
            },
            followedGroups: user.followedGroups,
            isBanned: user.isBanned,
            banReason: user.banReason
        };
    })
};
