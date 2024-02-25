"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const users_repository_1 = require("../repositories/users-repository");
const usersRoutes = (db) => {
    const router = express_1.default.Router();
    router.get("/", (req, res) => {
        let foundUsers = users_repository_1.usersRepository.findUser(db.users, req.query.fullName);
        res.status(200).json(foundUsers);
    });
    router.get("/:id", (req, res) => {
        let usersFound = users_repository_1.usersRepository.getUserById(+req.params.id, db.users);
        !usersFound ? res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404) : res.json(usersFound);
    });
    router.delete("/:id", (req, res) => {
        let foundUsers = users_repository_1.usersRepository.deleteUser(+req.params.id, db.users);
        !req.params.id && res.status(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
        foundUsers ? res.status(utils_1.HTTP_STATUSES.NO_CONTENT_204).json(foundUsers) :
            res.send(utils_1.HTTP_STATUSES.NOT_FOUND_404);
    });
    router.put("/:id", (req, res) => {
        let foundUser = users_repository_1.usersRepository.editFullNameUser(db.users, +req.params.id, req.body.fullName);
        foundUser ? res.setHeader('Content-Type', 'application/json').json(foundUser)
            .sendStatus(utils_1.HTTP_STATUSES.CREATED_201) : res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404);
    });
    router.post("/", (req, res) => {
        let createdUser = users_repository_1.usersRepository.createUser(db.users, req.body.fullName);
        createdUser ? res.json(createdUser).sendStatus(utils_1.HTTP_STATUSES.CREATED_201)
            : res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
    });
    return router;
};
exports.usersRoutes = usersRoutes;
