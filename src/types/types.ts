import {Request} from "express";

export type RequestBody<T> = Request<{}, {}, T>
export type RequestQuery<T> = Request<{}, {}, {}, T>
export type RequestParams<T> = Request<T>
export type RequestParamsBody<T, B> = Request<T,{},B>

export type usersType = {
    id: number
    fullName: string,
    followed: boolean,
    status: null | string,
    friendsCount: number,
    location: {
        country: string | null,
        city: string | null
    }
}

export type profileType = {
    userId: number
    name: string
    followed: boolean
    status: string | null
    aboutMe: string | null
    photos: {
        large: string | null
        small: string | null
    },
    location: {
        country: string | null
        city: string | null
    },
    isOnline: boolean
    isBanned: boolean
    banReason: string | null
}

export type DataBase = {
    users: Array<usersType>
    profiles: Array<profileType>
}

