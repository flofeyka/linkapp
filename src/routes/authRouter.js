const { Router } = require("express");
const authController = require("../controllers/authController");
const { body } = require("express-validator");

const authRouter = Router({});

authRouter.post("/register",
    body("email").isEmail().trim().notEmpty().withMessage("Email is required"),
    body("password").isLength({ min: 8, max: 32 }),
    authController.register);

authRouter.post("/login", authController.login);

authRouter.post("/logout", authController.logout);

authRouter.get("/activate/:link", authController.activate);

authRouter.get("/refresh", authController.refresh);

module.exports = authRouter;

