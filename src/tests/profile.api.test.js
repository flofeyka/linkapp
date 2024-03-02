const app = require("../app");
const request = require("supertest");
const db = require("./../db/database")

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

    it('User should have been followed', async () => {
        await request(app)
            .put('/follow/1')
            .send({follow: true})
            .expect(200)
        expect(db.profiles[0].followed).toBe(true)
    })
})