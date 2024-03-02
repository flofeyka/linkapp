"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = require("./routes/users");
const profile_1 = require("./routes/profile");
const actionWithUser_1 = require("./routes/actionWithUser");
const database_1 = require("./db/database");
function authGuardMiddleWare(req, res, next) {
}
exports.app = (0, express_1.default)();
const parserMiddleware = (0, body_parser_1.default)({});
exports.app.use(parserMiddleware);
exports.app.use("/users", (0, users_1.usersRoutes)(database_1.db));
exports.app.use("/profile", (0, profile_1.profileRoutes)(database_1.db));
exports.app.use("/follow", (0, actionWithUser_1.actionWithUserRoutes)(database_1.db));
