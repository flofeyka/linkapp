import { client } from "../db/database";
import { usersItemType } from "../types/usersType";

export const usersRepository = {
    __findUser: async (fullName: string): Promise<usersItemType[]> => {
        const users = await client.db("LinkApp").collection("users")
            .find({}, { fullName: { $regex: fullName } })
            .toArray();
        return await users;
    },

    __getAllUsers: async (): Promise<usersItemType[]> => {
        return await client.db("LinkApp")
            .collection("users").find({}).toArray();
    },

    __createUser: async (newUser: usersItemType): Promise<boolean> => {
        const db = await client.db("LinkApp");
        const usersCollection = await db.collection("users");

        return await usersCollection.insertOne(newUser);
    },

    __editFullNameUser: async (domain: string, fullName: string): Promise<boolean> => {
        const isEditedUser = await client.db("LinkApp").collection("users")
            .updateOne({ uniqueUserDomain: domain }, { $set: { fullName: fullName } });

        return isEditedUser.modifiedCount === 1;
    },

    __deleteUser: async (domain: string): Promise<boolean> => {
        const result = await client.db("LinkApp").collection("users").deleteOne({ uniqueUserDomain: domain });
        return result.deletedCount === 1;
    },

    __getUserByDomain: async (domain: string): Promise<usersItemType> => {
        return await client.db("LinkApp").collection("users").findOne({ uniqueUserDomain: domain });
    },

    __getUserByLogin: async (login: string): Promise<usersItemType> => {
        return await client.db("LinkApp").collection("users").findOne({login: login});
    },

    __getUserByEmail: async (email: string): Promise<usersItemType> => {
        return await client.db("LinkApp").collection("users").findOne({email: email})
    }
}