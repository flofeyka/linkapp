import express from "express";


const app = express();
const port = 3001;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware)

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
}

const HTTP_STATUSES = {
    OK200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    NOT_FOUND_404: 404,
    BAD_REQUEST_400: 400
}

app.get("/users", (req, res) => {
    let foundUsers = db.users;
    if(req.query.fullName) {
        foundUsers = foundUsers.filter(c => c.fullName.indexOf(req.query.fullName as string) > -1);
    }
    res.json(foundUsers);
});
app.get("/users/:id", (req, res) => {
    let usersFound = db.users.find(i => i.id === +req.params.id);

    if (!usersFound) {
        res.send("User is not found");
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.json(usersFound);
});
app.delete("/users/:id", (req, res) => {
    let foundUser = db.users;
    if(!req.params.id) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    db.users = db.users.filter(item => item.id !== +req.params.id);
    console.log(foundUser);
    res.json(foundUser);
});
app.put("/users/:id", (req, res) => {
    if(!req.body.fullName) {
        res.sendStatus(400);
        return;
    }
    let foundUser = db.users.find(item => item.id === +req.params.id);

    if(!foundUser) {
        res.sendStatus(404);
        return;
    }

    foundUser.fullName = req.body.fullName;
    res.sendStatus(HTTP_STATUSES.CREATED_201)
    res.json(foundUser);
})
app.post("/users", (req, res) => {
    if(!req.body.fullName) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
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
    }
    db.users.push(createdCourse);
    console.log(createdCourse);
    res.sendStatus(HTTP_STATUSES.CREATED_201);
    res.json(createdCourse);
})



app.listen(port, () => {
    console.log(`The server is started at ${port} port`)
})