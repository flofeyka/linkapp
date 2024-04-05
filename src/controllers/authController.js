const { validationResult } = require("express-validator");
const usersService = require("../services/users-service");
const ApiError = require("../exceptions/api-error");

class authController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const userData = await usersService.register(req.body.email, req.body.password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await usersService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData);
        } catch (e) {
            next(e)
        }

    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await usersService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token)
        } catch (e) {
            next(e)
        }

    }

    async activate(req, res, next) {
        try {

            res.json({
                "message": "Message is from eblan"
            })
        } catch (e) {
            next(e)
        }

    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await usersService.refreshToken(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData);
        } catch (e) {
            next(e)
        }

    }
}

module.exports = new authController();