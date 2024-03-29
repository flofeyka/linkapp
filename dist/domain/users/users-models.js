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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersModels = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.usersModels = {
    userItemModel: (user) => ({
        uniqueUserDomain: user.uniqueUserDomain,
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
    }),
    passwordHash: (password, passwordSalt) => __awaiter(void 0, void 0, void 0, function* () {
        return yield bcrypt_1.default.hash(password, passwordSalt);
    })
};
