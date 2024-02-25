import {DataBase} from "../types/types";

export const db: DataBase = {
    users: [
        {
            id: 1,
            fullName: "flofeyka",
            followed: false,
            status: null,
            friendsCount: 1,
            location: {
                country: "Russia",
                city: "Tobolsk"
            }
        },
        {
            id: 2,
            fullName: "supalonely",
            followed: true,
            status: "Just doing.",
            friendsCount: 14,
            location: {
                country: "Russia",
                city: "Tyumen"
            }
        },
        {
            id: 3,
            fullName: "Dimych",
            followed: true,
            status: null,
            friendsCount: 19,
            location: {
                country: "Russia",
                city: "Minsk"
            }
        }
    ],
    profiles: [
        {
            userId: 1,
            name: "flofey",
            followed: false,
            status: null,
            aboutMe: null,
            photos: {
                large: null,
                small: null
            },
            location: {
                country: null,
                city: null
            },
            isOnline: false,
            isBanned: false,
            banReason: null
        }
    ]
}