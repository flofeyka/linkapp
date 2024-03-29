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
exports.usersService = void 0;
const users_repository_1 = require("../repositories/users-repository");
exports.usersService = {
    findUser: (fullName) => __awaiter(void 0, void 0, void 0, function* () {
        if (!fullName) {
            const allUsers = yield users_repository_1.usersRepository.__getAllUsers;
            return allUsers.map((user) => {
                return {
                    uniqueUserDomen: user.uniqueUserDomain,
                    fullName: user.fullName,
                    followersCount: user.followersCount,
                    status: user.status,
                    friendsCount: user.friendsCount,
                    photos: {
                        small: user.photos.small,
                        large: user.photos.large
                    },
                    location: {
                        country: user.location.country,
                        city: user.location.city
                    },
                    isBanned: user.isBanned,
                    banReason: user.banReason
                };
            });
        }
        const user = yield users_repository_1.usersRepository.__findUser(fullName.toLowerCase());
        return {
            uniqueUserDomen: user.uniqueUserDomain,
            fullName: user.fullName,
            followersCount: user.followersCount,
            status: user.status,
            friendsCount: user.friendsCount,
            photos: {
                small: user.photos.small,
                large: user.photos.large
            },
            location: {
                country: user.location.country,
                city: user.location.city
            },
            isBanned: user.isBanned,
            banReason: user.banReason
        };
    }),
    createUser: (fullName, uniqueUserDomain) => __awaiter(void 0, void 0, void 0, function* () {
        if (!fullName || !uniqueUserDomain) {
            return undefined;
        }
        const user = users_repository_1.usersRepository.__createUser(fullName, uniqueUserDomain);
    }),
    editFullNameUser: (domain, fullName) => __awaiter(void 0, void 0, void 0, function* () {
        if (!domain) {
            return undefined;
        }
        if (yield users_repository_1.usersRepository.__editFullNameUser(domain, fullName)) {
            return yield exports.usersService.getUserByDomain(domain);
        }
    }),
    deleteUser: (domain) => __awaiter(void 0, void 0, void 0, function* () {
        if (!domain) {
            return undefined;
        }
        return yield users_repository_1.usersRepository.__deleteUser(domain);
    }),
    getUserByDomain: (domain) => __awaiter(void 0, void 0, void 0, function* () {
        if (!domain) {
            return undefined;
        }
        const user = yield users_repository_1.usersRepository.__getUserByDomain(domain);
        return {
            uniqueUserDomen: user.uniqueUserDomain,
            fullName: user.fullName,
            followersCount: user.followersCount,
            status: user.status,
            friendsCount: user.friendsCount,
            photos: {
                small: user.photos.small,
                large: user.photos.large
            },
            location: {
                country: user.location.country,
                city: user.location.city
            },
            isBanned: user.isBanned,
            banReason: user.banReason
        };
    })
};
