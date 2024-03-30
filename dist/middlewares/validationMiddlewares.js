"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidationMiddleware = exports.emailValidationMiddleware = exports.validationMiddleware = exports.inputValidationMiddleware = void 0;
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
function validationMiddleware(path, pathName) {
    return path(pathName).trim().isLength({ min: 3, max: 25 })
        .withMessage(`${pathName} length should be from 3 to 25 symbols`);
}
exports.validationMiddleware = validationMiddleware;
function emailValidationMiddleware(path, pathName) {
    return path(pathName).trim().required().isEmail()
        .withMessage(`Invalid email address`);
}
exports.emailValidationMiddleware = emailValidationMiddleware;
function passwordValidationMiddleware(path, pathName) {
    return path(pathName).trim().isLength({ min: 8 })
        .withMessage(`Password should have min 8 symbols`);
}
exports.passwordValidationMiddleware = passwordValidationMiddleware;