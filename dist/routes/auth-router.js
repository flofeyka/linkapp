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
const express_1 = require("express");
const users_service_1 = require("../domain/users/users-service");
const jwt_service_1 = require("../application/jwt-service");
const authRoutes = () => {
    const authRouter = (0, express_1.Router)({});
    authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield users_service_1.usersService.checkCredentials(req.body.loginOrEmail, req.body.password);
        if (user) {
            const token = yield jwt_service_1.jwtService.createJwt(user);
            res.status(201).json(token);
        }
        else {
            res.status(401);
        }
    }));
};
exports.default = authRoutes;
