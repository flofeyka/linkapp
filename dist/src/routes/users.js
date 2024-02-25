"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const usersRoutes = (db) => {
    const router = express_1.default.Router();
    router.get("/", (req, res) => {
        let foundUsers = db.users;
        if (req.query.fullName) {
            foundUsers = foundUsers.filter(c => c.fullName.indexOf(req.query.fullName) > -1);
        }
        res.json(foundUsers.map(user => {
            return {
                id: user.id,
                fullName: user.fullName,
                followed: user.followed,
                status: user.status,
                friendsCount: user.friendsCount,
                location: {
                    country: user.location.country,
                    city: user.location.city
                }
            };
        }));
    });
    router.get("/:id", (req, res) => {
        let usersFound = db.users.find(i => i.id === +req.params.id);
        if (!usersFound) {
            res.send("User is not found");
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
        res.json({
            id: usersFound.id,
            fullName: usersFound.fullName,
            followed: usersFound.followed,
            status: usersFound.status,
            friendsCount: usersFound.friendsCount,
            location: {
                country: usersFound.location.country,
                city: usersFound.location.city
            }
        });
    });
    router.delete("/:id", (req, res) => {
        if (!req.params.id) {
            res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        db.users = db.users.filter(item => item.id !== +req.params.id);
        res.json(db.users.map(user => {
            return {
                id: user.id,
                fullName: user.fullName,
                followed: user.followed,
                status: user.status,
                friendsCount: user.friendsCount,
                location: {
                    country: user.location.country,
                    city: user.location.city
                }
            };
        }));
    });
    router.put("/:id", (req, res) => {
        let foundUser = db.users.find(item => item.id === +req.params.id);
        if (!req.body.fullName) {
            res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        if (foundUser) {
            foundUser.fullName = req.body.fullName;
            res.sendStatus(utils_1.HTTP_STATUSES.CREATED_201);
        }
        else {
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.json({
            id: foundUser.id,
            fullName: foundUser.fullName,
            followed: foundUser.followed,
            status: foundUser.status,
            friendsCount: foundUser.friendsCount,
            location: {
                country: foundUser.location.country,
                city: foundUser.location.city
            }
        });
    });
    router.post("/", (req, res) => {
        let lastUser = db.users[db.users.length];
        const createdCourse = {
            id: lastUser.id + 1,
            fullName: req.body.fullName,
            followed: false,
            status: null,
            friendsCount: 0,
            location: {
                country: "",
                city: ""
            }
        };
        if (req.body.fullName) {
            db.users.push(createdCourse);
            res.sendStatus(utils_1.HTTP_STATUSES.CREATED_201);
            res.json({
                id: createdCourse.id,
                fullName: createdCourse.fullName,
                followed: createdCourse.followed,
                status: createdCourse.status,
                friendsCount: createdCourse.friendsCount,
                location: {
                    country: createdCourse.location.country,
                    city: createdCourse.location.city
                }
            });
        }
        else {
            res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
        }
    });
    return router;
};
exports.usersRoutes = usersRoutes;
