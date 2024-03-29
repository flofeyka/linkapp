
export type usersItemType = {
    uniqueUserDomain: string
    email: string
    passwordHash: string
    login: string
    fullName: string
    posts: Array<number>
    followersCount: number
    followersMembers: Array<number>
    comments: Array<number>
    status: null | string
    friendsCount: number,
    friendsMember: Array<number>
    photos: {
        small: null | string
        large: null | string
    }
    location: {
        country: null | string
        city: null | string
    }
    postsLiked: Array<number>
    commentsLiked: Array<number>
    followedGroups: Array<number>
    ownGroups: Array<number>
    isBanned: boolean
    banReason: null | string
}

export type answersType = {
    name: string
    photo: string | null
    userId: number
    message: string
    likesCount: number
    likesMember: Array<number>
    isChanged: boolean
    date: Date
}

export type commentType = {
    name: string
    photo: string | null
    userId: number
    message: string
    likesCount: number
    likesMember: Array<number>
    answers: Array<answersType>
    isChanged: boolean
    date: Date
}

export type postsItemType = {
    name: string
    photo: string | null
    userId: number
    message: string
    comments: Array<commentType>
    likesCount: number
    likesMember: Array<any>
    isChanged: boolean
    date: Date
}