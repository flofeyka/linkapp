import express from "express";
import bodyParser from "body-parser";
import {usersRoutes} from "./routes/users";
import {profileRoutes} from "./routes/profile";
import {actionWithUserRoutes} from "./routes/actionWithUser";
import {db} from "./db/database";

export const app = express();

const parserMiddleware = bodyParser({});
app.use(parserMiddleware);

app.use("/users", usersRoutes(db));
app.use("/profile", profileRoutes(db));
app.use("/follow", actionWithUserRoutes(db));
