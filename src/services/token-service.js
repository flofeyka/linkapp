require("dotenv").config();
const jwt = require("jsonwebtoken");
const usersModel = require("../models/users-model");
const tokenModel = require("../models/token-model");

class tokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "24h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch {
      return null;
    }
  }

  async saveToken(id, refreshToken) {
    const tokenData = await usersModel.findOne({ user: id });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    return await tokenModel.create({ user: id, refreshToken });
  }

  async removeToken(refreshToken) {
    return await tokenModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken) {
    return await tokenModel.findOne({ refreshToken });
  }
}

module.exports = new tokenService();
