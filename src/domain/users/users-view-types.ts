export type usersViewItemType = {
    uniqueUserDomain: string,
    fullName: string,
    followersCount: number,
    status: null | string,
    friendsCount: number,
    photos: {
        small: null | string,
        large: null | string
    },
    location: {
        country: null | string,
        city: null | string
    },
    isBanned: boolean,
    banReason: null | string
}