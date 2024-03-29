const { MongoClient } = require("mongodb");

const uri = process.env.mongoURI || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(uri);


export async function connectClient() {
    try {
        await client.connect();
        await client.db("LinkApp");
        console.log("Connected successfully")
        // let db = client.db("LinkApp")
        // let collection = db.collection("users");
        // let usersFound = await collection.findOne({id: 1})
        // console.log(usersFound)
    } catch {
        console.log("Can't connect to db")
        await client.close();
    }
}