require('dotenv').config();
const express = require('express');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/usersRouter');
const tasksRouter = require("./routes/tasksRouter");
const postsRouter = require("./routes/postsRouter");
const errorMiddleware = require('./middlewares/error-middleware');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true, 
    origin: process.env.CLIENT_URL
}))
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);
app.use("/posts", postsRouter)
app.use(errorMiddleware)



const start = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}

start();