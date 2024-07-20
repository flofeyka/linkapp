const UserDto = require("../dtos/UserDto");
const ApiError = require("../exceptions/ApiError");
const User = require("../models/User");
const tokenService = require("../services/tokenService");

module.exports = async function (req, res, next) {
    try {
        const tokenHeader = req.headers.authorization;
        if (!tokenHeader) {
            next(ApiError.Unauthorized());
        }
        const token = req.headers.authorization.split(" ")[1];
        const tokenData = tokenService.validateAccessToken(token);
        const user = await User.findById(tokenData.id);
        req.user = new UserDto(user);
        next();
    } catch (e) {
        next(ApiError.Unauthorized());
    }
}