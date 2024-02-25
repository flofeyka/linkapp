"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const profiles_repository_1 = require("../repositories/profiles-repository");
const profileRoutes = (db) => {
    const router = express_1.default.Router();
    router.get("/:userId", (req, res) => {
        const ProfileFound = profiles_repository_1.profilesRepository.profileFind(db.profiles, +req.params.userId);
        ProfileFound ? res.json(ProfileFound).sendStatus(utils_1.HTTP_STATUSES.OK200) :
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404);
    });
    return router;
};
exports.profileRoutes = profileRoutes;
