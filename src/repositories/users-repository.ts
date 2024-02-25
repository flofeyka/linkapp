import {usersType} from "../types/types";
import {HTTP_STATUSES} from "../utils/utils";

export const usersRepository = {
    findUser: (users: Array<usersType>, fullName: string | null | undefined) => {
        let foundUsers = users;
        if (fullName) {
            foundUsers = foundUsers.filter((user: usersType) =>
                user.fullName.toLowerCase().indexOf(fullName.toLowerCase()) > -1);
        }
        return foundUsers;
    },
    createUser: (users: Array<usersType>, fullName: string | null | undefined) => {
        if (fullName) {
            let lastUser = users[users.length - 1];
            const createdUser = {
                id: lastUser.id + 1,
                fullName: fullName,
                followed: false,
                status: null,
                friendsCount: 0,
                location: {
                    country: null,
                    city: null
                }
            }
            users.push(createdUser);
            return createdUser;
        } else {
            return undefined;
        }

    },
    editFullNameUser: (users: Array<usersType>, id: number, fullName: string | null | undefined) => {
        let userFound = users.find(user => user.id === id);
        if (!fullName) {
            return undefined;
        }
        if (userFound) return userFound.fullName = fullName;
    },
    deleteUser: (id: number | undefined, users: Array<usersType>) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) return users.splice(i, 1);
        }
        return false;
    },
    getUserById: (id: number, users: Array<usersType>) => {
        return users.find(i => i.id === id)
    }
}