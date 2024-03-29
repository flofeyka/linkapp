"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectClient = exports.client = void 0;
const { MongoClient } = require("mongodb");
const uri = process.env.mongoURI || "mongodb://0.0.0.0:27017";
exports.client = new MongoClient(uri);
function connectClient() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            yield exports.client.db("LinkApp");
            console.log("Connected successfully");
            // let db = client.db("LinkApp")
            // let collection = db.collection("users");
            // let usersFound = await collection.findOne({id: 1})
            // console.log(usersFound)
        }
        catch (_a) {
            console.log("Can't connect to db");
            yield exports.client.close();
        }
    });
}
exports.connectClient = connectClient;
