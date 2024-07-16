require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const authRouter = require('./routes/api/authRouter');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error-middleware');
const cors = require("cors");
const profileRouter = require('./routes/api/profileRouter');
const followRouter = require('./routes/api/followRouter');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL || true
}))
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api", followRouter)
app.use(errorMiddleware);

const start = () => {
    try {
        mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017", {
            useNewurlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server is started on ${PORT} port`))
    } catch(e) {
        console.log(e);
    }
}

start();