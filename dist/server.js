"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const db = {
    users: [
        {
            id: 1,
            fullName: "flofeyka",
            followed: false,
            status: null,
            friendsCount: 1,
            location: {
                country: "Russia",
                city: "Tobolsk"
            }
        },
        {
            id: 2,
            fullName: "supalonely",
            followed: true,
            status: "Just doing.",
            friendsCount: 14,
            location: {
                country: "Russia",
                city: "Tyumen"
            }
        },
        {
            id: 3,
            fullName: "Dimych",
            followed: true,
            status: null,
            friendsCount: 19,
            location: {
                country: "Russia",
                city: "Minsk"
            }
        }
    ]
};
app.get("/users", (req, res) => {
    let foundUsers = db.users;
    if (req.query.fullName) {
        foundUsers = foundUsers.filter(c => c.fullName.indexOf(req.query.fullName) > -1);
    }
    console.log(foundUsers);
    res.json(foundUsers);
});
app.get("/users/:id", (req, res) => {
    let usersFound = db.users.find(i => i.id === +req.params.id);
    if (!usersFound) {
        res.send("User is not found");
        res.sendStatus(404);
        return;
    }
    ;
    res.json(usersFound);
});
app.delete("/users/:id", (req, res) => {
    let foundUser = db.users;
    if (!req.params.id) {
        res.sendStatus(400);
        return;
    }
    db.users = db.users.filter(item => item.id !== +req.params.id);
    console.log(foundUser);
    res.json(foundUser);
});
app.put("/users/:id", (req, res) => {
    if (!req.body.fullName) {
        res.sendStatus(400);
        return;
    }
    let foundUser = db.users.find(item => item.id === +req.params.id);
    if (!foundUser) {
        res.sendStatus(404);
        return;
    }
    foundUser.fullName = req.body.fullName;
    res.json(foundUser);
});
app.post("/users", (req, res) => {
    if (!req.body.fullName) {
        res.sendStatus(400);
        return;
    }
    const createdCourse = {
        id: db.users.length + 1,
        fullName: req.body.fullName,
        followed: false,
        status: null,
        friendsCount: 0,
        location: {
            country: "",
            city: ""
        }
    };
    db.users.push(createdCourse);
    console.log(createdCourse);
    res.json(createdCourse);
});
app.listen(port, () => {
    console.log(`The server is started at ${port} port`);
});
