const { Router } = require("express");

const usersRouter = Router({});
module.exports = usersRouter;

usersRouter.get("/", (req, res) => {
    res.send("Hello from usersRouter");
});