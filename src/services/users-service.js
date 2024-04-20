const usersModel = require('../models/users-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class usersService {
    async getUserById(id) {
        const user = await usersModel.findOne({ _id: id });
        if (!user) {
            throw ApiError.BadRequest('User not found');
        }
        const userDto = new UserDto(user);
        return userDto;
    }

    async register(email, password, name) {
        const candidate = await usersModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`User with email ${email} already exists`);
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const activationLink = uuid.v4();
        const user = await usersModel.create({ email, password: passwordHash, activationLink, name });
        // await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(email, password) {
        const user = await usersModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest('User with this email not found');
        }

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) {
            throw ApiError.BadRequest('Incorrect password');
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unAuthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDB) {
            throw ApiError.unAuthorizedError();
        }
    
        const user = await usersModel.findById( userData.id );
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new usersService();