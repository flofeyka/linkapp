"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionWithUserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const actionWithUserRoutes = (db) => {
    const router = express_1.default.Router();
    router.put("/:userId", (req, res) => {
        const ProfileFound = db.profiles.find(profile => profile.userId === +req.params.userId);
        if (req.body.follow) {
            ProfileFound.followed = req.body.follow;
        }
        else {
            res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.json({
            followed: ProfileFound.followed
        });
    });
    return router;
};
exports.actionWithUserRoutes = actionWithUserRoutes;
