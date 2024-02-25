"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const profileRoutes = (db) => {
    const router = express_1.default.Router();
    router.get("/:userId", (req, res) => {
        const ProfileFound = db.profiles.find(profile => profile.userId === +req.params.userId);
        if (ProfileFound) {
            res.json({
                userId: ProfileFound.userId,
                name: ProfileFound.name,
                followed: ProfileFound.followed,
                status: ProfileFound.status,
                aboutMe: ProfileFound.aboutMe,
                photos: {
                    large: ProfileFound.photos.large,
                    small: ProfileFound.photos.small
                },
                location: {
                    country: ProfileFound.location.country,
                    city: ProfileFound.location.city
                },
                isOnline: ProfileFound.isOnline,
                isBanned: ProfileFound.isBanned,
                banReason: ProfileFound.banReason
            });
            res.sendStatus(utils_1.HTTP_STATUSES.OK200);
        }
        else {
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404);
        }
    });
    return router;
};
exports.profileRoutes = profileRoutes;
