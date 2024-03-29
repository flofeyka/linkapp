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
exports.usersRepository = void 0;
const database_1 = require("../db/database");
exports.usersRepository = {
    __findUser: (fullName) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield database_1.client.db("LinkApp").collection("users")
            .find({}, { fullName: { $regex: fullName } })
            .toArray();
        return yield users;
    }),
    __getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield database_1.client.db("LinkApp")
            .collection("users").find({}).toArray();
    }),
    __createUser: (newUser) => __awaiter(void 0, void 0, void 0, function* () {
        const db = yield database_1.client.db("LinkApp");
        const usersCollection = yield db.collection("users");
        return yield usersCollection.insertOne(newUser);
    }),
    __editFullNameUser: (domain, fullName) => __awaiter(void 0, void 0, void 0, function* () {
        const isEditedUser = yield database_1.client.db("LinkApp").collection("users")
            .updateOne({ uniqueUserDomain: domain }, { $set: { fullName: fullName } });
        return isEditedUser.modifiedCount === 1;
    }),
    __deleteUser: (domain) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield database_1.client.db("LinkApp").collection("users").deleteOne({ uniqueUserDomain: domain });
        return result.deletedCount === 1;
    }),
    __getUserByDomain: (domain) => __awaiter(void 0, void 0, void 0, function* () {
        return yield database_1.client.db("LinkApp").collection("users").findOne({ uniqueUserDomain: domain });
    }),
    __getUserByLogin: (login) => __awaiter(void 0, void 0, void 0, function* () {
        return yield database_1.client.db("LinkApp").collection("users").findOne({ login: login });
    }),
    __getUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield database_1.client.db("LinkApp").collection("users").findOne({ email: email });
    })
};
