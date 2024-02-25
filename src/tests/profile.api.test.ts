import {app} from "../app";
import request from "supertest";

describe("/profile", () => {
    let profileUsersData = {
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
    };

    it(`User's profile should be gotten`, async () => {
        await request(app)
            .get('/profile/1')
            .expect(200, profileUsersData)
    })
})