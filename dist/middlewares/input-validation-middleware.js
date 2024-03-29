"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueUserDomainValidationMiddleware = exports.fullNameValidationMiddleware = exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
function fullNameValidationMiddleware(path) {
    return path("fullName").trim().isLength({ min: 4, max: 15 })
        .withMessage("FullName length should be from 4 to 15 symbols");
}
exports.fullNameValidationMiddleware = fullNameValidationMiddleware;
function uniqueUserDomainValidationMiddleware(path) {
    return path("uniqueUserDomain").trim().isLength({ min: 4, max: 25 })
        .withMessage("Unique user's domain should be from 4 to 25 symbols");
}
exports.uniqueUserDomainValidationMiddleware = uniqueUserDomainValidationMiddleware;
