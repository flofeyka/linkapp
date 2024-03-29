"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const profile_1 = __importDefault(require("./routes/profile"));
const follow_1 = __importDefault(require("./routes/follow"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
const parserMiddleware = (0, body_parser_1.default)({});
exports.app.use(parserMiddleware);
exports.app.use("/users", (0, users_1.default)());
exports.app.use("/profile", (0, profile_1.default)());
exports.app.use("/follow", (0, follow_1.default)());
