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
const validationMiddlewares_1 = require("../middlewares/validationMiddlewares");
const express_validator_1 = require("express-validator");
const authRoutes = () => {
    const router = (0, express_1.Router)({});
    router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield users_service_1.usersService.checkCredentials(req.body.loginOrEmail, req.body.password);
        if (user) {
            const token = yield jwt_service_1.jwtService.createJwt(user);
            res.status(201).json(token);
        }
        else {
            res.status(401);
        }
    }));
    router.post("/register", (0, validationMiddlewares_1.validationMiddleware)(express_validator_1.body, "fullName"), (0, validationMiddlewares_1.validationMiddleware)(express_validator_1.body, "login"), (0, validationMiddlewares_1.emailValidationMiddleware)(express_validator_1.body, "email"), (0, validationMiddlewares_1.validationMiddleware)(express_validator_1.body, "password"), validationMiddlewares_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { fullName, login, email, password } = req.body;
        const result = yield users_service_1.usersService.createUser(fullName, login, email, password);
        result && res.json(result);
    }));
    return router;
};
exports.default = authRoutes;
