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
exports.usersService = void 0;
const users_repository_1 = require("../../repositories/users-repository");
const users_models_1 = require("./users-models");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.usersService = {
    findUser: (fullName) => __awaiter(void 0, void 0, void 0, function* () {
        if (!fullName) {
            const foundUsers = yield users_repository_1.usersRepository.__getAllUsers();
            return foundUsers.map((user) => {
                return users_models_1.usersModels.userItemModel(user);
            });
        }
        const foundUsers = yield users_repository_1.usersRepository.__findUser(fullName);
        return foundUsers.map((user) => {
            return users_models_1.usersModels.userItemModel(user);
        });
    }),
    createUser: (fullName, login, email, password) => __awaiter(void 0, void 0, void 0, function* () {
        if ((yield users_repository_1.usersRepository.__getUserByDomain(login)) || (yield users_repository_1.usersRepository.__getUserByLogin(login))) {
            return undefined;
        }
        else if (yield users_repository_1.usersRepository.__getUserByLoginOrEmail(email)) {
            return undefined;
        }
        const passwordSalt = yield bcrypt_1.default.genSalt(10);
        const passwordHash = yield users_models_1.usersModels.passwordHash(password, passwordSalt);
        const newUser = {
            uniqueUserDomain: login,
            email: email,
            login: login,
            passwordHash: passwordHash,
            fullName: fullName,
            posts: [],
            followersCount: 0,
            followersMembers: [],
            comments: [],
            status: null,
            friendsCount: 0,
            friendsMember: [],
            photos: {
                small: null,
                large: null
            },
            location: {
                country: null,
                city: null
            },
            postsLiked: [],
            commentsLiked: [],
            followedGroups: [],
            ownGroups: [],
            isBanned: false,
            banReason: null,
        };
        yield users_repository_1.usersRepository.__createUser(newUser);
        const user = yield exports.usersService.getUserByDomain(newUser.uniqueUserDomain);
        return users_models_1.usersModels.userItemModel(user);
    }),
    checkCredentials: (loginOrEmail, password) => __awaiter(void 0, void 0, void 0, function* () {
        return loginOrEmail;
    }),
    editFullNameUser: (domain, fullName) => __awaiter(void 0, void 0, void 0, function* () {
        if (yield users_repository_1.usersRepository.__editFullNameUser(domain, fullName)) {
            return yield exports.usersService.getUserByDomain(domain);
        }
        return undefined;
    }),
    deleteUser: (domain) => __awaiter(void 0, void 0, void 0, function* () {
        return yield users_repository_1.usersRepository.__deleteUser(domain);
    }),
    getUserByDomain: (domain) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield users_repository_1.usersRepository.__getUserByDomain(domain);
        if (!user) {
            return undefined;
        }
        return users_models_1.usersModels.userItemModel(user);
    }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield users_repository_1.usersRepository.__getUserById(id);
        if (!user) {
            return undefined;
        }
        return users_models_1.usersModels.userItemModel(user);
    })
};
