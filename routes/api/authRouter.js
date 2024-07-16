const { Router } = require("express");
const { signIn, signUp, getUserData, requestPasswordReset, resetPassword, validateResetToken } = require("../../controllers/authController");

const authRouter = Router();
module.exports = authRouter;

authRouter.post("/login", signIn);
authRouter.post("/register", signUp);
authRouter.get("/getUserData", getUserData);
authRouter.post("/requestPasswordReset", requestPasswordReset);
authRouter.put("/resetPassword/:token", resetPassword);
authRouter.get("/validateResetToken/:token", validateResetToken);