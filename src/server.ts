import { app } from "./app";
import { connectClient } from "./db/database";

const port = process.env.port || 3001;

const startApp = async () => {
    await connectClient();
    app.listen(port, () => {
        console.log(`The server is started at ${port} port`)
    });
}

startApp();

