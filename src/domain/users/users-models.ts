import { usersItemType } from "../../types/usersType";
import bcrypt from "bcrypt";

export const usersModels = {
    userItemModel: (user: usersItemType) => ({
        uniqueUserDomain: user.uniqueUserDomain,
        fullName: user.fullName,
        followersCount: user.followersCount,
        status: user.status,
        friendsCount: user.friendsCount,
        photos: {
            small: user.photos.small,
            large: user.photos.large
        },
        location: {
            country: user.location.country,
            city: user.location.city
        },
        isBanned: user.isBanned,
        banReason: user.banReason
    }),
    passwordHash: async (password: string, passwordSalt: string) => {
        return await bcrypt.hash(password, passwordSalt)
    }
}