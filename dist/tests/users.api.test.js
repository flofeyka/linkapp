"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const database_1 = require("../db/database");
const utils_1 = require("../utils/utils");
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
        }
    };
    it('USER SHOULD BE CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/users')
            .send({ fullName: "Test" })
            .expect(200, userData);
    }));
    it('USER SHOULD BE GOTTEN', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/users/4')
            .expect(200, userData);
    }));
    it('USER SHOULD BE FOUND', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/users?fullName=test')
            .expect(200, [userData]);
    }));
    it(`USER'S FULLNAME SHOULD BE CHANGED`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put('/users/4')
            .send({ fullName: "Test changed" })
            .expect(200);
        expect(database_1.db.users[3].fullName).toBe("Test changed");
    }));
    it('USER SHOULD BE DELETED', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/users/4')
            .expect(utils_1.HTTP_STATUSES.NO_CONTENT_204);
        expect(database_1.db.users.length).toBe(3);
    }));
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
    };
    it('USER SHOULDN`T BE CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/users')
            .send({ fullName: null })
            .expect(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
    }));
    it('USER SHOULDN`T BE GOTTEN', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/users/9')
            .expect(utils_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    it('USER SHOULDN`T BE FOUND', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/users?fullName=testdfg')
            .expect([]);
    }));
    it(`USER'S FULLNAME SHOULDN'T BE FOUND`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put('/users/24')
            .send({ fullName: "Test changed" })
            .expect(utils_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    it('USER SHOULDN`T BE FOUND AND DELETED', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/users/7')
            .expect(utils_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
});
