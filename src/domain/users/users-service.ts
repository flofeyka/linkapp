import { usersRepository } from "../../repositories/users-repository"
import { usersItemType } from "../../types/usersType";
import { usersModels } from "./users-models";
import { usersViewItemType } from "./users-view-types";
import bcrypt from "bcrypt";

export const usersService = {
    findUser: async (fullName: any):Promise<Array<usersViewItemType>> => {
        if (!fullName) {
            const foundUsers: Array<usersItemType> = await usersRepository.__getAllUsers();
            return foundUsers.map((user: usersItemType) => {
                return usersModels.userItemModel(user)
            })
        }
        const foundUsers: Array<usersItemType> = await usersRepository.__findUser(fullName);
        return foundUsers.map((user: usersItemType) => {
            return usersModels.userItemModel(user)
        })
    },

    createUser: async (fullName: string, login: string, email: string, password: string):Promise<usersViewItemType | string> => {
        if(await usersRepository.__getUserByDomain(login) || await usersRepository.__getUserByLogin(login)) {
            return "Login already exists"
        } else if(await usersRepository.__getUserByEmail(email)) {
            return "E-mail already exists"
        }

        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await usersModels.passwordHash(password, passwordSalt)

        const newUser:usersItemType = {
            uniqueUserDomain: login,
            email: email, 
            login: login,
            passwordHash: passwordHash,
            fullName: fullName,
            posts: [],
            followersCount: 0,
            followersMembers: [],
            comments: [],
            status: null,
            friendsCount: 0,
            friendsMember: [],
            photos: {
                small: null,
                large: null
            },
            location: {
                country: null,
                city: null
            },
            postsLiked: [],
            commentsLiked: [],
            followedGroups: [],
            ownGroups: [],
            isBanned: false,
            banReason: null,
        };

        await usersRepository.__createUser(newUser);
        const user: any = await usersService.getUserByDomain(newUser.uniqueUserDomain);
        return usersModels.userItemModel(user);
    },

    checkCredentials: async (loginOrEmail: string, password: string) => {
        return loginOrEmail
    },

    editFullNameUser: async (domain: string, fullName: string): Promise<usersViewItemType | undefined> => {
        if(await usersRepository.__editFullNameUser(domain, fullName)) {
            return await usersService.getUserByDomain(domain);
        }
        return undefined;
    },

    deleteUser: async (domain: string):Promise<boolean> => {
        return await usersRepository.__deleteUser(domain);
    },

    getUserByDomain: async (domain: string):Promise<usersViewItemType | undefined> => {
        const user:usersItemType = await usersRepository.__getUserByDomain(domain);
        if (!user) {
            return undefined;
        }
        return usersModels.userItemModel(user);
    }
}