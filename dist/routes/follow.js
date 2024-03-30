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
const express_1 = __importDefault(require("express"));
const users_repository_1 = require("../repositories/users-repository");
const actionWithUserRoutes = () => {
    const router = express_1.default.Router();
    router.put("/:domain", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const ProfileFound = yield users_repository_1.usersRepository.__findUser(req.params.domain);
        if (!ProfileFound) {
            res.status(404);
            return;
        }
        // req.body.follow ? ProfileFound.followed = req.body.follow : res.status(HTTP_STATUSES.BAD_REQUEST_400);
        // res.setHeader('Content-Type', 'application/json')
        //     .json({
        //         followed: ProfileFound.followed
        //     });
    }));
    return router;
};
exports.default = actionWithUserRoutes;