const CtrlWrapper = require("../decorators/CtrlWrapper");
const authService = require("../services/authService");
const tokenService = require("../services/tokenService");

const signIn = async (req, res) => {
    const {email, password} = req.body;
    const userData = await authService.signIn(email, password);
    res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 30*24*60*60*1000
    });

    return res.json(userData);
}

const signUp = async (req, res) => {
    const {name, email, password} = req.body;
    const userData = await authService.signUp(name, email, password);
    res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 30*24*60*60*1000
    })

    return res.json(userData);
}

const getUserData = async (req, res) => {
    const userData = await authService.getUserData(req.cookies.refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 30*24*60*60*1000
    });

    return res.json(userData);
}

const requestPasswordReset = async (req, res) => {
    const isRequestSent = await authService.requestPasswordReset(req.query.email);
    return res.status(isRequestSent ? 200 : 400).json(isRequestSent && "The request sent successful")
}

const resetPassword = async (req, res) => {
    const isPasswordReset = await authService.resetPassword(req.params.token, req.body.newPassword);
    return res.status(isPasswordReset ? 200 : 400).json(isPasswordReset && "Password is successfully reset")
}

const validateResetToken = async (req, res) => {
    const isTokenValid = await tokenService.isResetTokenValid(req.params.token);
    return res.status(isTokenValid ? 200 : 400).json(isTokenValid ? "Token is valid" : "Token is not valid")
}

module.exports = {
    signIn: CtrlWrapper(signIn),
    signUp: CtrlWrapper(signUp),
    getUserData: CtrlWrapper(getUserData),
    requestPasswordReset: CtrlWrapper(requestPasswordReset),
    resetPassword: CtrlWrapper(resetPassword),
    validateResetToken: CtrlWrapper(validateResetToken)
}