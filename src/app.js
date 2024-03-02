const express = require('express');
const usersRoutes = require('./routes/users.js');
const profileRoutes = require('./routes/profile.js');
const actionWithUserRoutes = require('./routes/actionWithUser.js');
const db = require('./db/database.js');
const bodyParser = require('body-parser');


const app = express();
module.exports = app;

const parserMiddleware = bodyParser({});
app.use(parserMiddleware);

app.use("/users", usersRoutes(db));
app.use("/profile", profileRoutes(db));
app.use("/follow", actionWithUserRoutes(db));
