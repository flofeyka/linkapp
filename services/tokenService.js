const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/ApiError");
const Token = require("../models/Token");
const ResetToken = require("../models/ResetToken");

const tokenService = {
    generateTokens(payload) {
        const accessToken = jwt.sign({ ...payload }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "24h"
        });
        const refreshToken = jwt.sign({ ...payload }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "30d"
        });

        return {
            accessToken,
            refreshToken
        }
    },

    validateAccessToken(accessToken) {
        try {
            const tokenFound = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            if (!tokenFound) {
                throw ApiError.Unauthorized();
            }

            return tokenFound
        } catch(e) {
            throw ApiError.Unauthorized();
        }
    },

    async validateRefreshToken(refreshToken) {
        const tokenFound = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        if (!tokenFound) {
            throw ApiError.Unauthorized("Invalid refresh token");
        }

        const tokenInDB = await Token.findOne({ refreshToken });
        if (!tokenInDB) {
            throw ApiError.Unauthorized("Refresh token expires")
        }

        return tokenInDB;
    },

    async updateRefreshToken(user, refreshToken) {
        const tokenInDB = await Token.findOne({ user });
        if (!tokenInDB) {
            const newTokenData = Token.create({
                user, refreshToken
            });
            return newTokenData;
        }
        tokenInDB.refreshToken = refreshToken;
        return await tokenInDB.save();
    },

    async removeToken(refreshToken) {
        const tokenRemoved = await Token.deleteOne({ refreshToken });
        if (tokenRemoved.deletedCount !== 1) {
            throw ApiError.Unauthorized("Token is not found");
        }

        return tokenRemoved.modifiedCount === 1;
    },

    async isResetTokenValid(resetToken) {
        const tokenFound = await ResetToken.findOne({ resetToken });

        if (!tokenFound) {
            throw ApiError.BadRequest("Invalid password reset url");
        }

        const now = Date.now();
        const ONE_DAY = 24 * 60 * 60 * 1000;
        if (now - tokenFound.requestedAt < ONE_DAY) {
            throw ApiError.BadRequest("Password reset token is invalid or expired.")
        }

        return tokenFound;
    }
}

module.exports = tokenService;