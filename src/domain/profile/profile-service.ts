import { usersRepository } from "../../repositories/users-repository";
import { usersItemType } from "../../types/usersType";

export const profileService = {
    getProfile: async (domain: string) => {
        const user: usersItemType = await usersRepository.__getUserByDomain(domain);
        if (user) return {
            uniqueUserDomain: user.uniqueUserDomain,
            fullName: user.fullName,
            followersCount: user.followersCount,
            followersMembers: user.followersMembers,
            status: user.status,
            friendsCount: user.friendsCount,
            friendsMember: user.friendsMember,
            photos: {
                small: user.photos.small,
                large: user.photos.large
            },
            location: {
                country: user.location.country,
                city: user.location.city
            },
            followedGroups: user.followedGroups,
            isBanned: user.isBanned,
            banReason: user.banReason
        }

        return undefined;
    }
}