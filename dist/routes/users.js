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
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const users_service_1 = require("../domain/users/users-service");
const express_validator_1 = require("express-validator");
const validationMiddlewares_1 = require("../middlewares/validationMiddlewares");
const resultsRequests_1 = require("../utils/resultsRequests");
const usersRoutes = () => {
    const router = express_1.default.Router();
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const foundUsers = yield users_service_1.usersService.findUser(req.query.fullName);
        !foundUsers && res.status(400);
        res.json({
            result: resultsRequests_1.requestsResults.SUCCESS,
            totalCount: 0,
            Items: foundUsers
        }).status(utils_1.HTTP_STATUSES.OK200);
    }));
    router.get("/:domain", validationMiddlewares_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const usersFound = yield users_service_1.usersService.getUserByDomain(req.params.domain);
        !usersFound ? res.json(resultsRequests_1.requestsResults.NOT_FOUND).status(utils_1.HTTP_STATUSES.NOT_FOUND_404)
            : res.json(usersFound);
    }));
    router.delete("/:domain", (0, validationMiddlewares_1.validationMiddleware)(express_validator_1.param, "domain"), validationMiddlewares_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const foundUsers = yield users_service_1.usersService.deleteUser(req.params.domain);
        !req.params.domain && res.status(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
        foundUsers ? res.json(resultsRequests_1.requestsResults.SUCCESS).status(utils_1.HTTP_STATUSES.NO_CONTENT_204) :
            res.json(resultsRequests_1.requestsResults.NOT_FOUND).status(utils_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    router.put("/:domain", (0, validationMiddlewares_1.validationMiddleware)(express_validator_1.param, "domain"), (0, validationMiddlewares_1.validationMiddleware)(express_validator_1.body, "fullName"), validationMiddlewares_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const editedUser = yield users_service_1.usersService.editFullNameUser(req.params.domain, req.body.fullName);
        editedUser ? res.json({
            result: resultsRequests_1.requestsResults.SUCCESS,
            editedUser
        }).status(utils_1.HTTP_STATUSES.CREATED_201) : res.json({
            result: resultsRequests_1.requestsResults.NOT_FOUND
        });
    }));
    return router;
};
exports.default = usersRoutes;
