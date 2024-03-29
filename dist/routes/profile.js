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
const resultsRequests_1 = require("../utils/resultsRequests");
const profile_service_1 = require("../domain/profile/profile-service");
const validationMiddlewares_1 = require("../middlewares/validationMiddlewares");
const express_validator_1 = require("express-validator");
const profileRoutes = () => {
    const router = express_1.default.Router();
    router.get("/:domain", (0, validationMiddlewares_1.validationMiddleware)(express_validator_1.param, "domain"), validationMiddlewares_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const ProfileFound = yield profile_service_1.profileService.getProfile(req.params.domain);
        ProfileFound ? res.json(ProfileFound).status(utils_1.HTTP_STATUSES.OK200) :
            res.json(resultsRequests_1.requestsResults.NOT_FOUND).status(utils_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    return router;
};
exports.default = profileRoutes;
