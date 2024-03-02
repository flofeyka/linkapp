const request = require("supertest");
const app = require("../app");
const db = require("../db/database");
const HTTP_STATUSES = require("../utils/utils");

describe("/users", () => {
    const userData = {
        id: 4,
        fullName: "Test",
        followed: false,
        status: null,
        friendsCount: 0,
        location: {
            country: null,
            city: null
        },
        photos: {
            small: null,
            large: null
        },
        isBanned: false
    }
    it('USER SHOULD BE CREATED', async () => {
        await request(app)
            .post('/users')
            .send({fullName: "Test"})
            .expect(200, userData);
    });
    it('USER SHOULD BE GOTTEN', async () => {
        await request(app)
            .get('/users/4')
            .expect(200, userData)
    });
    it('USER SHOULD BE FOUND', async () => {
        await request(app)
            .get('/users?fullName=test')
            .expect(200, [userData])
    })
    it( `USER'S FULLNAME SHOULD BE CHANGED`, async () => {
        await request(app)
            .put('/users/4')
            .send({fullName: "Test changed"})
            .expect(200);
        expect(db.users[3].fullName).toBe("Test changed");
    });
    it('USER SHOULD BE DELETED', async () => {
        await request(app)
            .delete('/users/4')
            .expect(HTTP_STATUSES.NO_CONTENT_204);
        expect(db.users.length).toBe(3);
    })
});

describe("/users/checkMiskakes", () => {
    const userData = {
        id: 4,
        fullName: "Test",
        followed: false,
        status: null,
        friendsCount: 0,
        location: {
            country: null,
            city: null
        }
    }
    it('USER SHOULDN`T BE CREATED', async () => {
        await request(app)
            .post('/users')
            .send({fullName: null})
            .expect({
                errors: [
                    {
                        type: "field",
                        value: "",
                        msg: "FullName length should be from 4 to 15 symbols",
                        path: "fullName",
                        location: "body"
                    }
                ]
            });
    });
    it('USER SHOULDN`T BE GOTTEN', async () => {
        await request(app)
            .get('/users/9')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    });
    it('USER SHOULDN`T BE FOUND', async () => {
        await request(app)
            .get('/users?fullName=testdfg')
            .expect([])
    })
    it( `USER'S FULLNAME SHOULDN'T BE FOUND`, async () => {
        await request(app)
            .put('/users/24')
            .send({fullName: "Test changed"})
            .expect(HTTP_STATUSES.NOT_FOUND_404);
    });
    it('USER SHOULDN`T BE FOUND AND DELETED', async () => {
        await request(app)
            .delete('/users/7')
            .expect(HTTP_STATUSES.NOT_FOUND_404);
    })
})