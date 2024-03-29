import express from "express";
import usersRoutes from "./routes/users";
import profileRoutes from "./routes/profile"
import actionWithUserRoutes from "./routes/follow";
import bodyParser from "body-parser";

export const app = express();

const parserMiddleware = bodyParser({});
app.use(parserMiddleware);

app.use("/users", usersRoutes());
app.use("/profile", profileRoutes());
app.use("/follow", actionWithUserRoutes());
