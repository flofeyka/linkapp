import express from "express";
import usersRoutes from "./routes/users";
import profileRoutes from "./routes/profile"
import bodyParser from "body-parser";
import authRouter  from "./routes/auth";

export const app = express();

const parserMiddleware = bodyParser({});
app.use(parserMiddleware);

app.use("/users", usersRoutes());
app.use("/profile", profileRoutes());
app.use("/auth", authRouter());